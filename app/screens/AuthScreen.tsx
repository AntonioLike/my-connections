// AuthScreen.tsx
import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

type AuthMode = "login" | "register" | "forgot"

interface AuthScreenProps extends AppStackScreenProps<"Auth"> { }

export const AuthScreen: FC<AuthScreenProps> = observer(function AuthScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [authError, setAuthError] = useState("")

  const {
    authenticationStore: {
      authEmail,
      authPassword,
      authName,
      setAuthEmail,
      setAuthPassword,
      setAuthName,
      handleAuth,
      validationError,
    },
  } = useStores()

  const {
    themed,
    theme: { colors, spacing },
  } = useAppTheme()

  useEffect(() => {
    setAuthEmail("")
    setAuthPassword("")
    setAuthName("")
    return () => {
      setAuthEmail("")
      setAuthPassword("")
      setAuthName("")
    }
  }, [setAuthEmail])

  useEffect(() => {
    if (authError) setAuthError("")
  }, [authEmail, authPassword, authName])

  const error = isSubmitted ? validationError(authMode) : ""

  const handleSubmit = async () => {
    setIsSubmitted(true)
    setAttemptsCount((c) => c + 1)

    const result = await handleAuth(authMode)
    if (result) {
      setAuthError(result)
      return
    }

    setIsSubmitted(false)
    setAuthError("")
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  const headingText =
    authMode === "login"
      ? "loginScreen:logIn"
      : authMode === "register"
        ? "loginScreen:signUp"
        : "loginScreen:forgotPassword"

  const buttonText =
    authMode === "login"
      ? "loginScreen:tapToLogIn"
      : authMode === "register"
        ? "loginScreen:tapToRegister"
        : "loginScreen:tapToReset"

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="auth-heading" tx={headingText} preset="heading" style={themed($logIn)} />
      <Text tx="loginScreen:enterDetails" preset="subheading" style={themed($enterDetails)} />
      {attemptsCount > 2 && (
        <Text tx="loginScreen:hint" size="sm" weight="light" style={themed($hint)} />
      )}

      {authMode === "register" && (
        <TextField
          value={authName}
          onChangeText={setAuthName}
          containerStyle={themed($textField)}
          autoCapitalize="words"
          autoCorrect={false}
          labelTx="loginScreen:nameFieldLabel"
          placeholderTx="loginScreen:nameFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />
      )}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen:emailFieldLabel"
        placeholderTx="loginScreen:emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      {authMode !== "forgot" && (
        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen:passwordFieldLabel"
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          onSubmitEditing={handleSubmit}
          RightAccessory={PasswordRightAccessory}
        />
      )}

      {authError !== "" && (
        <Text
          text={authError}
          preset="bold"
          style={{ marginBottom: spacing.lg }}
        />
      )}

      <Button
        testID="auth-button"
        tx={buttonText}
        style={themed($tapButton)}
        preset="reversed"
        onPress={handleSubmit}
      />

      <View style={{ marginTop: spacing.md }}>
        {authMode === "login" && (
          <>
            <Button
              tx="loginScreen:signUpInstead"
              onPress={() => setAuthMode("register")}
              preset="default"
            />
            <Button
              tx="loginScreen:forgotInstead"
              onPress={() => setAuthMode("forgot")}
              preset="default"
            />
          </>
        )}
        {(authMode === "register" || authMode === "forgot") && (
          <Button
            tx="loginScreen:backToLogin"
            onPress={() => setAuthMode("login")}
            preset="default"
          />
        )}
      </View>
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.md,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})
