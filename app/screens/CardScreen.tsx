import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { spacing } from "@/theme"
import { useStores } from "@/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models" 

interface CardScreenProps extends AppStackScreenProps<"Card"> { }


export const CardScreen: FC<CardScreenProps> = observer(function CardScreen() {

  const [refreshing, setRefreshing] = React.useState(false)

  // Pull in one of our MST stores
  const { cardStore } = useStores()
  const { cards } = cardStore

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = () => {
    setRefreshing(true)
    cardStore.getCards()
    setRefreshing(false)
  }


  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <View style={$header}>
        <Text preset="heading" text="question" tx={"cardScreen:title"} />
      </View>
    </Screen>
  )

})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg,
}

const $header: TextStyle = {
  marginTop: spacing.xxxl,
  marginBottom: spacing.md,
}
