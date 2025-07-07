import { CardSnapshotIn, CardSnapshotOut } from "@/models";
import { GeneralApiProblem } from "../apiProblem";

export type CardsResult =
    | { kind: "ok"; cards: CardSnapshotIn[] }
    | GeneralApiProblem
