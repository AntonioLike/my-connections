import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * A model representing a user's response to a card in a given link.
 */
export const UserCardResponseModel = types
  .model("UserCardResponse", {
    id: types.identifierNumber,
    linkId: types.number,
    cardId: types.number,
    response: types.enumeration("Response", ["yes", "no"]),
  })
  .actions(withSetPropAction)
  .views((self) => ({}))
  .actions((self) => ({}))

export interface UserCardResponse extends Instance<typeof UserCardResponseModel> { }
export interface UserCardResponseSnapshotOut extends SnapshotOut<typeof UserCardResponseModel> { }
export interface UserCardResponseSnapshotIn extends SnapshotIn<typeof UserCardResponseModel> { }
export const createUserCardResponseDefaultModel = () =>
  types.optional(UserCardResponseModel, {
    id: 0,
    linkId: 0,
    cardId: 0,
    response: "no",
  })
