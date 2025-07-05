import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import { CardModel, CardSnapshotIn } from "../models/Card"

/**
 * A CardStore model.
 */
export const CardStoreModel = types
    .model("CardStore")
    .props({
        cards: types.array(CardModel),
    })
    .actions((store) => ({
        setCards(snapshots: CardSnapshotIn[]) {
            const models = snapshots.map(CardModel.create)
            store.cards.replace(models)
        }
    }))

export interface CardStore extends Instance<typeof CardStoreModel> { }
export interface CardStoreSnapshotOut extends SnapshotOut<typeof CardStoreModel> { }
export interface CardStoreSnapshotIn extends SnapshotIn<typeof CardStoreModel> { }
