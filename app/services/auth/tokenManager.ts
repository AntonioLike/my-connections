// app/services/auth/tokenManager.ts
import * as storage from "@/utils/storage"

const ACCESS = "accessToken"
const REFRESH = "refreshToken"

export const tokenManager = {
    getAccess: () => Promise.resolve(storage.loadString(ACCESS)),
    setAccess: (t?: string) => Promise.resolve((t ? storage.saveString(ACCESS, t) : storage.remove(ACCESS))),
    getRefresh: () => Promise.resolve(storage.loadString(REFRESH)),
    setRefresh: (t?: string) => Promise.resolve((t ? storage.saveString(REFRESH, t) : storage.remove(REFRESH))),
}
