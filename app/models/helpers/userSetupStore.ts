// app/models/Card/card-store-setup.ts
import { UserStore } from "../UserStore";

export async function fetchAndSetMeAndMyConnections(userStore: UserStore) {
    await userStore.fetchMeAndMyConnections();
}
