import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    name: types.string,
    email: types.string,
    password: types.string,
    userToken: types.identifier,
    connections: types.optional(types.array(types.string), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> { }
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> { }
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> { }
export const createUserDefaultModel = (id: string, name: string, email: string, password: string, userToken: string, connections?: string[]) => types.optional(UserModel, { id, name, email, password, userToken, connections })


