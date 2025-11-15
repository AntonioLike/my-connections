import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserCardResponseStoreModel } from "./UserCardResponseStore"
import { UserStoreModel } from "./UserStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { CardStoreModel } from "./CardStore"
import { ConnectionStoreModel } from "./ConnectionStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  cardStore: types.optional(CardStoreModel, { cards: [] }),
  userCardResponseStore: types.optional(UserCardResponseStoreModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  connectionStore: types.optional(ConnectionStoreModel, { connections: [] }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
