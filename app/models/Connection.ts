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
    user: UserModel,
    status: types.optional(types.enumeration("Status", ["pending", "linked"]), "linked"),
  })
  .actions(withSetPropAction)

export interface Connection extends Instance<typeof ConnectionModel> { }
export interface ConnectionSnapshotOut extends SnapshotOut<typeof ConnectionModel> { }
export interface ConnectionSnapshotIn extends SnapshotIn<typeof ConnectionModel> { }
export const createConnectionDefaultModel = () =>
  types.optional(ConnectionModel, {
    id: 0,
    user: {
      name: "",
      email: "",
      userToken: "",
    },
    status: "pending",
  })
