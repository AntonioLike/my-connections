import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "./User"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Represents a connection between two users
 */
export const ConnectionModel = types
  .model("Connection")
  .props({
    id: types.identifierNumber,
    user1: UserModel,
    user2: UserModel,
    status: types.enumeration("Status", ["pending", "linked"]),
  })
  .actions(withSetPropAction)

export interface Connection extends Instance<typeof ConnectionModel> { }
export interface ConnectionSnapshotOut extends SnapshotOut<typeof ConnectionModel> { }
export interface ConnectionSnapshotIn extends SnapshotIn<typeof ConnectionModel> { }
export const createConnectionDefaultModel = () =>
  types.optional(ConnectionModel, {
    id: 0,
    user1: {
      id: 0,
      name: "",
      email: "",
      password: "",
      userToken: "",
    },
    user2: {
      id: 0,
      name: "",
      email: "",
      password: "",
      userToken: "",
    },
    status: "pending",
  })
