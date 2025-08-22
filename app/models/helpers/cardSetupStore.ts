// app/models/Card/card-store-setup.ts
import { CardStore } from "../CardStore"

export async function fetchAndSetCards(cardStore: CardStore) {
    await cardStore.fetchCards();
}
