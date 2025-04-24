import { UserSnapshotOut } from "@/models";
import { GeneralApiProblem } from "../apiProblem";

export type UserResult =
    | { kind: "ok"; user: UserSnapshotOut }
    | GeneralApiProblem

