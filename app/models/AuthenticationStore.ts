import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { authApi } from "@/services/auth/auth.api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    authToken: types.maybe(types.string),
    authEmail: "",
    authPassword: "",
    authName: "",
  })
  .views((store) => ({
    isAuthenticated(): boolean {
      return !!store.authToken
    },

    validationError(authMode: "login" | "register" | "forgot"): string {
      if (authMode === "register" && store.authName.trim().length === 0) {
        return "name can't be blank"
      }

      if (store.authEmail.length === 0) return "email can't be blank"
      if (store.authEmail.length < 6) return "email must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"

      if (authMode !== "forgot") {
        if (store.authPassword.length < 6) return "password must be at least 6 characters"
      }

      return ""
    },
  }))
  .actions((store) => {
    const setAuthToken = (value?: string) => {
      store.authToken = value
    }

    const setAuthEmail = (value: string) => {
      store.authEmail = value.replace(/ /g, "")
    }

    const setAuthPassword = (value: string) => {
      store.authPassword = value
    }

    const setAuthName = (value: string) => {
      store.authName = value
    }

    const logout = () => {
      store.authToken = undefined
      store.authEmail = ""
      store.authPassword = ""
      store.authName = ""
    }

    const handleAuth = flow(function* (authMode: "login" | "register" | "forgot") {
      const error = store.validationError(authMode)
      if (error) return error

      const credentials = {
        email: store.authEmail,
        password: store.authPassword,
        ...(authMode === "register" && { name: store.authName }),
      }

      try {
        if (authMode === "login") {
          const result = yield authApi.login(credentials)
          if (result.kind === "ok") {
            store.authToken = result.data.token
          } else {
            return result.kind
          }
        } else if (authMode === "register") {
          const result = yield authApi.register(credentials)
          if (result.kind === "ok") {
            store.authToken = result.data.token
          } else {
            return result.kind
          }
        } else if (authMode === "forgot") {
          const result = yield authApi.forgotPassword(store.authEmail)
          if (result.kind !== "ok") {
            return result.kind
          }
          console.log(`Password reset sent to ${store.authEmail}`)
        }

        // Safe reset
        store.authEmail = ""
        store.authPassword = ""
        store.authName = ""

        return ""
      } catch (e) {
        console.error("Authentication error", e)
        return "unexpected-error"
      }
    })

    return {
      setAuthToken,
      setAuthEmail,
      setAuthPassword,
      setAuthName,
      logout,
      handleAuth,
    }
  })

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }
