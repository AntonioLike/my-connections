import { UserStore } from "../UserStore";

export async function fetchMe(userStore: UserStore) {
    await userStore.fetchMe();
}
