import { UserCardResponseSnapshotIn, UserCardResponseSnapshotOut } from "@/models";
import { GeneralApiProblem } from "../apiProblem";

export type UserCardResponseListResult =
    | { kind: "ok"; responses: UserCardResponseSnapshotIn[] }
    | GeneralApiProblem

export type UserCardResponseResult =
    | { kind: "ok"; userCardResponse: UserCardResponseSnapshotIn }
    | GeneralApiProblem
