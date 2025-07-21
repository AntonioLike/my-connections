import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserCardResponse, UserCardResponseModel } from "./UserCardResponse"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { userCardResponseApi } from "@/services/user-card-response/user.card.response.api"

export const UserCardResponseStoreModel = types
    .model("UserCardResponseStore", {
        responses: types.array(UserCardResponseModel),
        selectedLinkId: types.maybe(types.number),
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        async fetchResponsesForLink(userToken: string, linkId: number) {
            const result = await userCardResponseApi.getAllCardsWithResponses(userToken, linkId)
            if (result.kind === "ok") {
                store.setProp("responses", result.responses)
                store.setProp("selectedLinkId", linkId)
            } else {
                console.error("Error fetching responses for link:", result)
            }
        },

        async setResponse(payload: UserCardResponse) {
            const result = await userCardResponseApi.setResponse(payload)
            if (result.kind === "ok") {
                const newResponse = result.userCardResponse
                const existing = store.responses.find(
                    (r) => r.linkId === newResponse.linkId && r.cardId === newResponse.cardId,
                )

                if (existing) {
                    existing.setProp("response", newResponse.response)
                } else {
                    store.responses.push(newResponse)
                }
            } else {
                console.error("Failed to set response:", result)
            }
        },
    }))
    .views((store) => {
        const allForSelectedLink = () =>
            store.selectedLinkId != null
                ? store.responses.filter((r) => r.linkId === store.selectedLinkId)
                : []

        return {
            /** All responses for the selected link */
            get responsesForSelectedLink() {
                return allForSelectedLink()
            },

            /** Responses where the user answered "yes" */
            get yesResponses() {
                return allForSelectedLink().filter((r) => r.response === "yes")
            },

            /** Responses where the user answered "no" */
            get noResponses() {
                return allForSelectedLink().filter((r) => r.response === "no")
            },

            /** Responses where the user hasn't answered yet */
            get unansweredResponses() {
                return allForSelectedLink().filter((r) => r.response === null)
            },

            /** Count of "yes" responses */
            get countYes() {
                return this.yesResponses.length
            },

            /** Count of "no" responses */
            get countNo() {
                return this.noResponses.length
            },

            /** Whether the user has responded to a given card */
            hasRespondedToCard(cardId: number) {
                return allForSelectedLink().some((r) => r.cardId === cardId)
            },
        }
    })

export interface UserCardResponseStore extends Instance<typeof UserCardResponseStoreModel> { }
export interface UserCardResponseStoreSnapshot extends SnapshotOut<typeof UserCardResponseStoreModel> { }
