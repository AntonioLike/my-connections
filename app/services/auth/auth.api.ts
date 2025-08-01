import { ApiResponse } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem"
import type { ApiConfig } from "../api.types"
import { api } from "../api"
import { AuthResult } from "./auth.api.types"
import { AuthCredentials, AuthResponse } from "@/models/helpers/authModels"

const AUTH_API_CONFIG: ApiConfig = {
    url: `${Config.API_URL}auth/`,
}

export class AuthApi extends api {
    constructor() {
        super(AUTH_API_CONFIG)
    }

    /**
     * Register
     */
    async register(credentials: AuthCredentials): Promise<AuthResult> {
        const response: ApiResponse<AuthResponse> = await this.apisauce.post("register", credentials)

        const problem = this.handleProblem(response)
        if (problem) return problem

        try {
            const data = response.data as AuthResponse
            return { kind: "ok", data }
        } catch (e) {
            if (__DEV__ && e instanceof Error) {
                console.error(`Bad auth data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }
    }

    /**
     * Login
     */
    async login(credentials: AuthCredentials): Promise<AuthResult> {
        const response: ApiResponse<AuthResponse> = await this.apisauce.post("login", credentials)

        const problem = this.handleProblem(response)
        if (problem) return problem

        try {
            const data = response.data as AuthResponse
            return { kind: "ok", data }
        } catch (e) {
            if (__DEV__ && e instanceof Error) {
                console.error(`Bad auth data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }
    }

    /**
     * Forgot Password
     */
    async forgotPassword(email: string): Promise<{ kind: "ok" } | GeneralApiProblem> {
        const response: ApiResponse<null> = await this.apisauce.post("forgot", { email })

        const problem = this.handleProblem(response)
        if (problem) return problem

        return { kind: "ok" }
    }
}

export const authApi = new AuthApi()
