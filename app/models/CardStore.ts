import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
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
        async fetchCards() {
            const result = await cardApi.getCards();
            if (result.kind === "ok") {
                // CardSnapshotOut is usually compatible with SnapshotIn
                const snapshots = result.cards;
                const models = snapshots.map(CardModel.create)
                store.cards.replace(models)
            } else {
                console.error("Error fetching cards:", result)
            }
        }
    }
    ))

export interface CardStore extends Instance<typeof CardStoreModel> { }
export interface CardStoreSnapshotOut extends SnapshotOut<typeof CardStoreModel> { }
export interface CardStoreSnapshotIn extends SnapshotIn<typeof CardStoreModel> { }
