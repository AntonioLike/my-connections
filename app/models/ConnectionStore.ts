import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ConnectionModel } from "./Connection"
import { connectionApi } from "@/services/connection/connection.api"
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
        fetchConnections: flow(function* () {
            const result = yield connectionApi.getMyConnections()
            if (result.kind === "ok") {
                const snapshots = result.connections.map((c: any) => ({
                    id: c.id,
                    user: {
                        name: c.user?.name ?? "",
                        userToken: c.user?.userToken ?? "",
                    },
                    status: "linked",                    // or c.status ?? "pending" if API provides it
                }))

                self.connections.replace(snapshots as any)
            }
            else {
                console.error("Error fetching connections:", result);
            }
        }),

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
