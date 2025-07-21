import { Instance, SnapshotOut, SnapshotIn, types, flow } from "mobx-state-tree"
import { CardModel, CardSnapshotIn } from "../models/Card"
import { cardApi } from "@/services"

/**
 * A CardStore model.
 */
export const CardStoreModel = types
    .model("CardStore")
    .props({
        cards: types.array(CardModel),
    })
    .actions((store) => ({
        fetchCards: flow(function* () {
            const result = yield cardApi.getCards();
            if (result.kind === "ok") {
                const models = result.cards.map((snapshot: CardSnapshotIn) => CardModel.create(snapshot));
                store.cards.replace(models); // safe inside flow
            } else {
                console.error("Error fetching cards:", result);
            }
        })
    }))

export interface CardStore extends Instance<typeof CardStoreModel> { }
export interface CardStoreSnapshotOut extends SnapshotOut<typeof CardStoreModel> { }
export interface CardStoreSnapshotIn extends SnapshotIn<typeof CardStoreModel> { }
