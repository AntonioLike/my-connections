import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * A model representing a user's response to a card in a given link.
 */
export const UserCardResponseModel = types
  .model("UserCardResponse", {
    id: types.identifierNumber,
    linkId: types.string,
    cardId: types.number,
    cardTitle: types.string,
    cardImagePath: types.string,
    response: types.enumeration("Response", ["yes", "no"]),
  })
  .actions(withSetPropAction)
  .views((self) => ({}))
  .actions((self) => ({}))

export interface UserCardResponse extends Instance<typeof UserCardResponseModel> { }
export interface UserCardResponseSnapshotOut extends SnapshotOut<typeof UserCardResponseModel> { }
export interface UserCardResponseSnapshotIn extends SnapshotIn<typeof UserCardResponseModel> { }