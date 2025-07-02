import { ApiResponse } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem"
import type { ApiConfig } from "../api.types"
import { api } from "../api"
import {
  UserCardResponseListResult,
  UserCardResponseResult
} from "./user.card.response.api.types"
import {
  UserCardResponseSnapshotOut,
  UserCardResponseSnapshotIn,
  UserCardResponse,
} from "@/models"

const USER_CARD_RESPONSE_API_CONFIG: ApiConfig = {
  url: `${Config.API_URL}user-card-response/`,
}

export class UserCardResponseApi extends api {
  constructor() {
    super(USER_CARD_RESPONSE_API_CONFIG)
  }

  /**
   * Get all cards with a user's responses for a specific link
   */
  async getAllCardsWithResponses(
    userToken: string,
    linkId: string,
  ): Promise<UserCardResponseListResult> {
    const response: ApiResponse<UserCardResponseSnapshotOut[]> = await this.apisauce.get(
      `all-cards/${userToken}/${linkId}`,
    )

    const problem = this.handleProblem(response)
    if (problem) return problem

    try {
      const list: UserCardResponseSnapshotIn[] = response.data as UserCardResponseSnapshotIn[]
      return { kind: "ok", responses: list }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Set or update a user card response
   */
  async setResponse(input: UserCardResponse): Promise<UserCardResponseResult> {
    const response: ApiResponse<UserCardResponseSnapshotOut> = await this.apisauce.post("", input)

    const problem = this.handleProblem(response)
    if (problem) return problem

    try {
      const saved: UserCardResponseSnapshotIn = response.data as UserCardResponseSnapshotIn
      return { kind: "ok", userCardResponse: saved }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

export const userCardResponseApi = new UserCardResponseApi()
