import { UserSnapshotOut } from "@/models";
import { GeneralApiProblem } from "../apiProblem";

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export type GetUserResult =
  | { kind: "ok"; user: UserSnapshotOut }
  | GeneralApiProblem

