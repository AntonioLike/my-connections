/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */

import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { getGeneralApiProblem, GeneralApiProblem } from "./apiProblem"
import type { ApiConfig } from "./api.types"

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */

export class api {
    apisauce: ApisauceInstance
    config: ApiConfig

    constructor(config: ApiConfig) {
        this.config = config
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: "application/json",
            },
        })
    }

    // the typical ways to die when calling an api
    protected handleProblem<T>(response: ApiResponse<T>): GeneralApiProblem | null {
        if (!response.ok) {
            return getGeneralApiProblem(response)
        }
        return null
    }
}
