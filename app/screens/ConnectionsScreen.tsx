import { FC } from "react"
import { View, Pressable, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { useNavigation } from "@react-navigation/native"

interface ConnectionsScreenProps extends AppStackScreenProps<"Connections"> { }

const mockConnections = [
  { id: "1", name: "Alice", linkId: 1 },
  { id: "2", name: "Bob", linkId: 2 },
]

export const ConnectionsScreen: FC<ConnectionsScreenProps> = observer(function ConnectionsScreen() {
  const navigation = useNavigation<AppStackScreenProps<"ConnectionCards">["navigation"]>()

  const goToCards = (linkId: Number) => {
    navigation.navigate("ConnectionCards", { linkId })
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text text="Your Connections" style={$title} />
      {mockConnections.map((conn) => (
        <Pressable key={conn.id} onPress={() => goToCards(conn.linkId)} style={$card}>
          <Text text={conn.name} />
        </Pressable>
      ))}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 16,
}

const $title: ViewStyle = {
  marginBottom: 16,
}

const $card: ViewStyle = {
  backgroundColor: "#ddd",
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
}
