import { ApiResponse } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem } from "../apiProblem"
import type { ApiConfig } from "../api.types"
import { User, UserSnapshotIn, UserSnapshotOut } from "@/models"
import { api } from "../api"
import { UserResult } from "./user.api.types"

const USER_API_CONFIG: ApiConfig = {
  url: `${Config.API_URL}user/`,
}

export class UserApi extends api {
  constructor() {
    super(USER_API_CONFIG)
  }

  /**
   * Gets auth user information.
   * @returns The user data.
   */
  async getMe(): Promise<UserResult> {
    const response: ApiResponse<UserSnapshotOut> = await this.apisauce.get("")

    const problem = this.handleProblem(response)
    if (problem) return problem

    try {
      const user: UserSnapshotIn = response.data as UserSnapshotIn
      return { kind: "ok", user }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad user data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

export const userApi = new UserApi()
