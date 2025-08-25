import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ConnectionModel } from "./Connection"
import { connectionApi } from "@/services/connection/connection.api"
import { ConnectionSnapshotIn } from "./Connection"
import { ConnectionResult, LinkRequestResult } from "@/services/connection/connection.api.types"

/**
 * MobX-state-tree store for managing connections between users.
 */
export const ConnectionStoreModel = types
    .model("ConnectionStore")
    .props({
        connections: types.array(ConnectionModel),
    })
    .actions(withSetPropAction)
    .actions((self) => ({
        /**
         * Fetches all connections for a given userToken.
         */
        async fetchConnections() {
            const result = await connectionApi.geMyConnections()

            if (result.kind === "ok") {
                self.connections.replace(result.connections.map((c: ConnectionSnapshotIn) => ConnectionModel.create(c)))
            } else {
                console.tron.error("Error fetching connections", result)
            }
        },

        /**
         * Sends a link request and updates the store with the new connection.
         */
        async linkWithToken(otherToken: string) {
            const result = await connectionApi.linkWithToken(otherToken)

            if (result.kind === "ok") {
                const newConnection = ConnectionModel.create(result.connection)
                self.connections.push(newConnection)
                return newConnection
            } else {
                console.tron.error("Error linking with token", result)
                if (result.kind === "rejected") {
                    throw new Error(result.message || "Failed to link with token")
                }
                else {
                    throw new Error("Failed to link with token")
                }
            }
        },
    }))

export interface ConnectionStore extends Instance<typeof ConnectionStoreModel> { }
export interface ConnectionStoreSnapshotOut extends SnapshotOut<typeof ConnectionStoreModel> { }
export interface ConnectionStoreSnapshotIn extends SnapshotIn<typeof ConnectionStoreModel> { }
