import { StyleProp, TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components/Text"

export interface AspectCardProps {
  /**
   * Card content (from CardModel).
   */
  card: {
    title: string
    imagePath?: string
  }

  /**
   * Optional style override.
   */
  style?: StyleProp<ViewStyle>
}

export const AspectCard = observer(function AspectCard(props: AspectCardProps) {
  const { style, card } = props
  const $styles = [$container, style]
  const { themed } = useAppTheme()

  return (
    <View style={$styles}>
      <Text style={themed($title)}>{card.title}</Text>
      {card.imagePath ? (
        <Image source={{ uri: card.imagePath }} style={$image} resizeMode="contain" />
      ) : null}
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: "transparent",
  padding: 16,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 8,
  width: "100%",
  alignItems: "center",
}

const $title: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.bold,
  fontSize: 18,
  color: colors.text,
  marginTop: 12,
})

const $image: ImageStyle = {
  width: "100%",
  height: 200,
  borderRadius: 8,
}
