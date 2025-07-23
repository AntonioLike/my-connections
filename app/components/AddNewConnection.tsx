import { useState } from "react"
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TextInput,
  Pressable,
  Alert,
} from "react-native"
import { observer } from "mobx-react-lite"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components/Text"
import { useStores } from "@/models"

export interface AddNewConnectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
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

  const handleAddConnection = async () => {
    const currentUserToken = userStore.user?.userToken
    if (!currentUserToken) {
      Alert.alert("Error", "You must be logged in to add a connection.")
      return
    }

    if (!userTokenInput.trim()) {
      Alert.alert("Input Required", "Please enter a valid user token.")
      return
    }

    try {
      await connectionStore.linkWithToken(currentUserToken, userTokenInput.trim())
      Alert.alert("Success", "Connection request sent!")
      setUserTokenInput("")
    } catch (error) {
      Alert.alert("Error", "Failed to link with this token.")
    }
  }

  return (
    <View style={$styles}>
      <Text style={themed($text)}>Add a connection by token:</Text>
      <TextInput
        value={userTokenInput}
        onChangeText={setUserTokenInput}
        placeholder="Enter user token"
        autoCapitalize="none"
        style={$input}
      />
      <Pressable onPress={handleAddConnection} style={themed($button)}>
        <Text style={$buttonText}>Add</Text>
      </Pressable>
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

const $input: ViewStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 6,
  padding: 10,
  marginBottom: 12,
}

const $button: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
  paddingVertical: 10,
  borderRadius: 6,
})

const $buttonText: TextStyle = {
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
}
