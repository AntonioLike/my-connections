import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { User, UserModel } from "./User"
import { userApi } from "@/services/user/user.api"
import { connectionApi } from "@/services/connection/connection.api"
import { UserResult } from "@/services/user/user.api.types"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.maybe(UserModel),
    connections: types.optional(types.array(types.string), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchMe: flow(function* () {
      const result = yield userApi.getMe();
      const resultConnections = yield connectionApi.getMyConnections();
      if (result.kind === "ok" && resultConnections.kind === "ok") {
        self.user = result.user; // safe inside flow
        self.connections = resultConnections.connections.map((c: { id: any }) => c.id);
      } else {
        console.error("Error fetching user and their connections:", result);
      }
    }),
    setUser(userData: any) {
      self.user = UserModel.create(userData)
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> { }
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> { }
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> { }


