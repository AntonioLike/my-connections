import { ConnectionSnapshotIn } from "@/models"

export type ConnectionResult =
    | { kind: "ok"; connections: ConnectionSnapshotIn[] }
    | { kind: "bad-data" }
    | { kind: "timeout" | "cannot-connect" | "server" | "unauthorized" | "forbidden" | "not-found"; temporary?: boolean }

export type LinkRequestResult =
    | { kind: "ok"; connection: ConnectionSnapshotIn }
    | { kind: "ok"; message: string }
    | { kind: "bad-data" }
    | { kind: "timeout" | "cannot-connect" | "server" | "unauthorized" | "forbidden" | "not-found"; temporary?: boolean }
