import { ApiResponse } from "apisauce"
import Config from "../../config"
import { getGeneralApiProblem, GeneralApiProblem } from "../apiProblem"
import { ApiConfig } from "../api.types"
import { api } from "../api"
import { ConnectionSnapshotIn } from "@/models"
import { ConnectionResult, LinkRequestResult } from "./connection.api.types"

const CONNECTION_API_CONFIG: ApiConfig = {
    url: `${Config.API_URL}connection/`, // or 'link/' if your route differs
}

export class ConnectionApi extends api {
    constructor() {
        super(CONNECTION_API_CONFIG)
    }

    /**
     * Gets all connections for the given user token
     */
    async geMyConnections(): Promise<ConnectionResult | GeneralApiProblem> {
        const response: ApiResponse<ConnectionSnapshotIn[]> = await this.apisauce.get("")

        const problem = this.handleProblem(response)
        if (problem) return problem

        try {
            const connections: ConnectionSnapshotIn[] = response.data as ConnectionSnapshotIn[]
            return { kind: "ok", connections }
        } catch (e) {
            if (__DEV__ && e instanceof Error) {
                console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }
    }

    /**
     * Creates a link between two user tokens
     */
    async linkWithToken(targetToken: string): Promise<LinkRequestResult | GeneralApiProblem> {
        const response: ApiResponse<ConnectionSnapshotIn> = await this.apisauce.post(
            `link?targetToken=${targetToken}`
        )

        const problem = this.handleProblem(response)
        if (problem) return problem

        try {
            const connection: ConnectionSnapshotIn = response.data as ConnectionSnapshotIn
            return { kind: "ok", connection }
        } catch (e) {
            if (__DEV__ && e instanceof Error) {
                console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }
    }

}

export const connectionApi = new ConnectionApi()
