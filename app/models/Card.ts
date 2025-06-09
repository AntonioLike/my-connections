import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const CardModel = types
  .model("Card")
  .props({
    id: types.identifierNumber,
    title: types.string,
    imagePath: types.maybe(types.string),
    like: types.maybe(types.boolean),
  })
  .actions(withSetPropAction)
  .actions((self) => ({}))

export interface Card extends Instance<typeof CardModel> { }
export interface CardSnapshotOut extends SnapshotOut<typeof CardModel> { }
export interface CardSnapshotIn extends SnapshotIn<typeof CardModel> { }
export const createCardDefaultModel = (id: number, title: string, image: string) =>
  types.optional(CardModel, { id, title, imagePath: image })