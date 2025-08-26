// app/services/api/api.ts
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { getGeneralApiProblem, GeneralApiProblem } from "./apiProblem"
import type { ApiConfig } from "./api.types"
import { tokenManager } from "./auth/tokenManager"

// --- shared single-flight state across all api instances ---
let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null
let waiters: Array<() => void> = []

function notifyWaiters() {
    waiters.forEach((w) => w())
    waiters = []
}

async function refreshTokens(): Promise<boolean> {
    const refreshToken = await tokenManager.getRefresh()
    if (!refreshToken) return false
    if (refreshPromise) return refreshPromise

    refreshPromise = (async () => {
        try {
            isRefreshing = true
            // Adjust path/body to your backend
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            })
            if (!res.ok) return false
            const data = (await res.json()) as { accessToken: string; refreshToken?: string }
            await tokenManager.setAccess(data.accessToken)
            if (data.refreshToken) await tokenManager.setRefresh(data.refreshToken)
            return true
        } catch {
            return false
        } finally {
            isRefreshing = false
            const p = refreshPromise
            refreshPromise = null
        }
    })()

    return refreshPromise
}

export class api {
    apisauce: ApisauceInstance
    config: ApiConfig

    constructor(config: ApiConfig) {
        this.config = config
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        })

        this.installAuth()
    }

    private installAuth() {
        // 1) Attach Authorization on every request
        this.apisauce.addAsyncRequestTransform(async (req) => {
            const token = await tokenManager.getAccess()
            if (token) {
                req.headers = { ...(req.headers ?? {}), Authorization: `Bearer ${token}` }
            } else if (req.headers?.Authorization) {
                delete req.headers.Authorization
            }
        })

        // 2) Handle 401s → refresh → retry once
        this.apisauce.addAsyncResponseTransform(async (response) => {
            if (response.status !== 401) return

            // avoid loops on auth endpoints
            const url = response.config?.url ?? ""
            if (url.includes("/auth/login") || url.includes("/auth/refresh")) return

            // Kick off or join a single-flight refresh
            if (!isRefreshing) {
                void refreshTokens().then((ok) => {
                    if (!ok) {
                        tokenManager.setAccess(undefined)
                        tokenManager.setRefresh(undefined)
                    }
                    notifyWaiters()
                })
            }

            // Park this response until refresh completes
            await new Promise<void>((resolve) => waiters.push(resolve))

            const newAccess = await tokenManager.getAccess()
            if (!newAccess || !response.config) return // give up; caller will see the 401

            // Retry original request once with new token
            const retry = await this.apisauce.any({
                ...response.config,
                headers: { ...(response.config.headers ?? {}), Authorization: `Bearer ${newAccess}` },
            }) as ApiResponse<unknown>

            // Make this transform "return" the retried result
            Object.assign(response, retry)
        })
    }

    // the typical ways to die when calling an api
    protected handleProblem<T>(response: ApiResponse<T>): GeneralApiProblem | null {
        if (!response.ok) {
            return getGeneralApiProblem(response)
        }
        return null
    }
}
