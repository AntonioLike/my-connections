import { useState } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text, TextField, Button } from "@/components"
import { useStores } from "@/models"

export interface AddNewConnectionProps {
  style?: StyleProp<ViewStyle>
}

export const AddNewConnection = observer(function AddNewConnection(
  props: AddNewConnectionProps,
) {
  const { style } = props
  const $styles = [$container, style]
  const { themed } = useAppTheme()
  const { connectionStore, userStore } = useStores()

  const [userTokenInput, setUserTokenInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleAddConnection = async () => {
    setError(null)
    setSuccess(null)

    const currentUserToken = userStore.user?.userToken
    if (!currentUserToken) {
      setError("You must be logged in to add a connection.")
      return
    }

    if (!userTokenInput.trim()) {
      setError("Please enter a valid user token.")
      return
    }

    try {
      await connectionStore.linkWithToken(currentUserToken, userTokenInput.trim())
      setSuccess("Connection request sent!")
      setUserTokenInput("")
    } catch (e: any) {
      setError(e.message || "Failed to link with this token.")
    }
  }

  return (
    <View style={$styles}>
      <Text style={themed($text)}>Add a connection by token:</Text>

      <TextField
        value={userTokenInput}
        onChangeText={setUserTokenInput}
        placeholder="Enter user token"
        autoCapitalize="none"
        status={error ? "error" : undefined}
        helper={error || success || ""}
      />

      <Button
        text="Add"
        onPress={handleAddConnection}
        style={themed($button)}
        textStyle={$buttonText}
      />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  paddingTop: 16,
}

const $text: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
  marginBottom: 8,
})

const $button: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
  marginTop: 12,
  borderRadius: 6,
})

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
}
