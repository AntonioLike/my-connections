import { Instance, SnapshotOut, types, getRoot } from "mobx-state-tree"
import { authApi } from "@/services/auth/auth.api"


export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: "",
  })
  .views((store) => ({
    isAuthenticated(): boolean {
      return !!store.authToken
    },

    validationError(authMode: "login" | "register" | "forgot"): string {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"

      if (authMode !== "forgot") {
        if (store.authPassword.length < 6) return "password must be at least 6 characters"
      }

      return ""
    },
  }))
  .actions((store) => {
    return {
      setAuthToken(value?: string) {
        store.authToken = value
      },

      setAuthEmail(value: string) {
        store.authEmail = value.replace(/ /g, "")
      },

      setAuthPassword(value: string) {
        store.authPassword = value
      },

      logout() {
        store.authToken = undefined
        store.authEmail = ""
        store.authPassword = ""
      },

      async handleAuth(authMode: "login" | "register" | "forgot"): Promise<string> {
        const error = store.validationError(authMode)
        if (error) return error

        const credentials = {
          email: store.authEmail,
          password: store.authPassword,
        }

        try {
          if (authMode === "login") {
            const result = await authApi.login(credentials)
            if (result.kind === "ok") {
              store.authToken = result.data.token
            } else {
              return result.kind // e.g., "unauthorized" or "timeout"
            }
          } else if (authMode === "register") {
            const result = await authApi.register(credentials)
            if (result.kind === "ok") {
              store.authToken = result.data.token
            } else {
              return result.kind
            }
          } else if (authMode === "forgot") {
            const result = await authApi.forgotPassword(store.authEmail)
            if (result.kind !== "ok") {
              return result.kind
            }
            console.log(`Password reset sent to ${store.authEmail}`)
          }

          store.authPassword = ""
          store.authEmail = ""
          return ""
        } catch (e) {
          console.error("Authentication error", e)
          return "unexpected-error"
        }
      }

    }
  })

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }
