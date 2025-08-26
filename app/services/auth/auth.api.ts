// app/services/auth/auth.api.ts
import { ApiResponse } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem } from "../apiProblem"
import type { ApiConfig } from "../api.types"
import { api } from "../api"
import { AuthResult } from "./auth.api.types"
import { AuthCredentials, AuthResponse } from "@/models/helpers/authModels"
import { tokenManager } from "../auth/tokenManager" // ⬅️ add this

const AUTH_API_CONFIG: ApiConfig = {
    url: `${Config.API_URL}auth/`,
}

export class AuthApi extends api {
    constructor() {
        super(AUTH_API_CONFIG)
    }

    async register(credentials: AuthCredentials): Promise<AuthResult> {
        const response: ApiResponse<AuthResponse> = await this.apisauce.post("register", credentials)
        const problem = this.handleProblem(response)
        if (problem) return problem

        try {
            const data = response.data as AuthResponse
            // ⬇️ Save tokens (adjust property names to your payload)
            await tokenManager.setAccess(data.accessToken)
            if (data.refreshToken) await tokenManager.setRefresh(data.refreshToken)

            return { kind: "ok", data }
        } catch (e) {
            if (__DEV__ && e instanceof Error) {
                console.error(`Bad auth data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }
    }

    async login(credentials: AuthCredentials): Promise<AuthResult> {
        const response: ApiResponse<AuthResponse> = await this.apisauce.post("login", credentials)
        const problem = this.handleProblem(response)
        if (problem) return problem

        try {
            const data = response.data as AuthResponse
            // ⬇️ Save tokens (adjust property names to your payload)
            await tokenManager.setAccess(data.accessToken)
            if (data.refreshToken) await tokenManager.setRefresh(data.refreshToken)

            return { kind: "ok", data }
        } catch (e) {
            if (__DEV__ && e instanceof Error) {
                console.error(`Bad auth data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }
    }

    async forgotPassword(email: string): Promise<{ kind: "ok" } | GeneralApiProblem> {
        const response: ApiResponse<null> = await this.apisauce.post("forgot", { email })
        const problem = this.handleProblem(response)
        if (problem) return problem
        return { kind: "ok" }
    }

    // Optional: central logout helper
    async logout() {
        await tokenManager.setAccess(undefined)
        await tokenManager.setRefresh(undefined)
    }
}

export const authApi = new AuthApi()
