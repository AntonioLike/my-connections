import { View, ViewStyle, Animated, Easing } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "@/models"
import { Text, Button } from "@/components"
import * as Clipboard from "expo-clipboard"
import { useMemo, useRef } from "react"

export const UserTokenView = observer(function UserTokenView() {
  const { userStore } = useStores()
  const token = userStore.user?.userToken

  const toastOpacity = useRef(new Animated.Value(0)).current
  const toastTranslate = useRef(new Animated.Value(10)).current
  const toastTimer = useRef<NodeJS.Timeout | null>(null)

  const showToast = useMemo(
    () => (message = "Invite code copied!") => {
      // clear any existing timer/animation
      if (toastTimer.current) clearTimeout(toastTimer.current)
      toastOpacity.setValue(0)
      toastTranslate.setValue(10)

      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(toastTranslate, {
          toValue: 0,
          duration: 180,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start()

      toastTimer.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(toastOpacity, {
            toValue: 0,
            duration: 180,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(toastTranslate, {
            toValue: 10,
            duration: 180,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start()
      }, 1600)
    },
    [toastOpacity, toastTranslate],
  )

  if (!token) return null

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(token)
    showToast()
  }

  return (
    <View style={$container}>
      <Text preset="subheading" text="Your Invite Code" />
      <Text selectable style={$tokenText}>
        {token}
      </Text>
      <Button text="Copy Code" onPress={copyToClipboard} style={$copyButton} />

      {/* Inline, non-blocking toast */}
      <Animated.View
        pointerEvents="none"
        style={[
          $toast,
          {
            opacity: toastOpacity,
            transform: [{ translateY: toastTranslate }],
          },
        ]}
      >
        <Text text="Invite code copied!" preset="bold" style={$toastText} />
      </Animated.View>
    </View>
  )
})

const $container: ViewStyle = {
  padding: 12,
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 16,
}

const $tokenText: ViewStyle = {
  marginVertical: 8,
}

const $copyButton: ViewStyle = {
  alignSelf: "flex-start",
}

const $toast: ViewStyle = {
  position: "absolute",
  left: 12,
  right: 12,
  bottom: -8, // sits just below the card; tweak as you like
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.8)",
  alignItems: "center",
}

const $toastText: ViewStyle = {
  // Ignite Text handles color via preset; if needed, you can pass style={{ color: "#fff" }}
}
