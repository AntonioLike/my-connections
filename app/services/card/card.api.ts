import { ApiResponse } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem } from "../apiProblem"
import type { ApiConfig } from "../api.types"
import { Card, CardModel, CardSnapshotIn, CardSnapshotOut, User, UserSnapshotOut } from "@/models"
import { api } from "../api"
import { CardsResult } from "./card.api.types"
import { getSnapshot } from "mobx-state-tree"

const CARD_API_CONFIG: ApiConfig = {
  url: `${Config.API_URL}card/`,
}


export class CardApi extends api {
  constructor() {
    super(CARD_API_CONFIG)
  }

  async getCards(): Promise<CardsResult> {
    const response: ApiResponse<CardSnapshotIn[]> = await this.apisauce.get("");

    const problem = this.handleProblem(response);
    if (problem) return problem;

    try {

      const cards: CardSnapshotOut[] =
        response.data?.map((raw) => {
          const transformed = {
            ...raw,
            imagePath: raw.imagePath ? `${Config.API_URL}${raw.imagePath}` : undefined,
          };

          const instance = CardModel.create(transformed);
          return getSnapshot(instance);
        }) ?? [];

      return { kind: "ok", cards };
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack);
      }
      return { kind: "bad-data" };
    }
  }

}

export const cardApi = new CardApi();