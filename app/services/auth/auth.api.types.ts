import { GeneralApiProblem } from "../apiProblem"
import { AuthResponse } from "@/models/helpers/authModels"

export type AuthResult =
    | { kind: "ok"; data: AuthResponse }
    | GeneralApiProblem
