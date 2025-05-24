import { getRoot, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { CardModel } from "./Card"
import { cardApi, CardsResult } from "@/services"

export const CardStoreModel = types
  .model("CardStore")
  .props({
    cards: types.optional(types.array(CardModel), []),
    answers: types.optional(
      types.array(
        types.model({
          cardId: types.string,
          response: types.enumeration(["yes", "no"]),
        })
      ),
      []
    ),
  })
  .actions(withSetPropAction)
  .views((self) => ({}))
  .actions((self) => ({
    async getCards() {
      const root = getRoot<any>(self)
      const userId = root.userStore?.user?.id

      const result: CardsResult = await cardApi.getCards(userId)
      if (result.kind === "ok") {
        self.setProp("cards", result.cards)
      } else {
        console.tron.error(`Error fetching cards: ${JSON.stringify(result)}`, [])
      }
    },

    saveAnswer(cardId: string, response: "yes" | "no") {
      self.answers.push({ cardId, response })
      // Later: you could call a backend here
    },
  }))

export interface CardStore extends Instance<typeof CardStoreModel> { }
export interface CardStoreSnapshotOut extends SnapshotOut<typeof CardStoreModel> { }
export interface CardStoreSnapshotIn extends SnapshotIn<typeof CardStoreModel> { }
export const createCardStoreDefaultModel = () => types.optional(CardStoreModel, {})