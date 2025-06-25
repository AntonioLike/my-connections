import { UserCardResponseSnapshotOut } from "@/models";
import { GeneralApiProblem } from "../apiProblem";

export type UserCardResponseListResult =
    | { kind: "ok"; responses: UserCardResponseSnapshotOut[] }
    | GeneralApiProblem

export type UserCardResponseResult =
    | { kind: "ok"; userCardResponse: UserCardResponseSnapshotOut }
    | GeneralApiProblem
