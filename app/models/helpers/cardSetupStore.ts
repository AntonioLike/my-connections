// app/models/Card/card-store-setup.ts
import { CardStore } from "../CardStore"
import { CardSnapshotIn } from "../Card"

export async function fetchAndSetCards(cardStore: CardStore) {
    await cardStore.fetchCards();
}
