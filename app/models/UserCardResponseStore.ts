import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserCardResponse, UserCardResponseModel } from "./UserCardResponse"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { userCardResponseApi } from "@/services/user-card-response/user.card.response.api"

export const UserCardResponseStoreModel = types
    .model("UserCardResponseStore", {
        responses: types.array(UserCardResponseModel),
        filteredOnly: false,
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
        }
    }))
    .views((store) => {
        const responsesForSelectedLink = () => {
            if (!store.selectedLinkId) return []
            return store.responses.filter((r) => r.linkId === store.selectedLinkId)
        }

        return {
            get responsesForSelectedLink() {
                return responsesForSelectedLink()
            },

            get yesResponses() {
                return responsesForSelectedLink().filter((r) => r.response === "yes")
            },

            get noResponses() {
                return responsesForSelectedLink().filter((r) => r.response === "no")
            },

            get countYes() {
                return responsesForSelectedLink().filter((r) => r.response === "yes").length
            },

            get countNo() {
                return responsesForSelectedLink().filter((r) => r.response === "no").length
            },

            hasRespondedToCard(cardId: number) {
                return responsesForSelectedLink().some((r) => r.cardId === cardId)
            },
        }
    })


export interface UserCardResponseStore extends Instance<typeof UserCardResponseStoreModel> { }
export interface UserCardResponseStoreSnapshot extends SnapshotOut<typeof UserCardResponseStoreModel> { }
