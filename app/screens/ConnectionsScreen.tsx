import { FC } from "react"
import { ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "@/navigators"
import { Button, Screen, Text } from "@/components"
import { useNavigation } from "@react-navigation/native"
import { AddNewConnection } from "@/components/AddNewConnection"
import { useStores } from "@/models"

interface ConnectionsScreenProps extends AppStackScreenProps<"Connections"> { }

export const ConnectionsScreen: FC<ConnectionsScreenProps> = observer(function ConnectionsScreen() {
  const navigation = useNavigation<AppStackScreenProps<"ConnectionCards">["navigation"]>()

  const { connectionStore } = useStores()

  const connections = connectionStore.connections;

  const goToCards = (linkId: Number) => {
    navigation.navigate("ConnectionCards", { linkId })
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text text="Your Connections" style={$title} />

      {connections.map((conn) => (
        <Button key={conn.id} onPress={() => goToCards(conn.id)} preset="default" style={$card}>
          {conn.user.name}
        </Button>
      ))}

      <AddNewConnection style={$addConnection} />
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
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
}

const $addConnection: ViewStyle = {
  marginBottom: 24,
}

