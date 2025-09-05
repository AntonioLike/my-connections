import { ConnectionStore } from "../ConnectionStore";

export async function fetchMyConnections(connectionStore: ConnectionStore) {
    await connectionStore.fetchConnections();
}
