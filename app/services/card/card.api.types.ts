import { CardSnapshotOut } from "@/models";
import { GeneralApiProblem } from "../apiProblem";

export type CardsResult =
    | { kind: "ok"; cards: CardSnapshotOut[] }
    | GeneralApiProblem
