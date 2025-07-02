import React, { useEffect, useState } from "react"
import { View, Text, ActivityIndicator, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { AspectCard } from "@/components"
import { AppStackScreenProps } from "@/navigators"

interface ConnectionCardsScreenProps extends AppStackScreenProps<"ConnectionCards"> { }

export const ConnectionCardsScreen = observer(({ route }: ConnectionCardsScreenProps) => {
  const { userCardResponseStore, userStore } = useStores()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const { linkToken } = route.params

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      //const userToken = await userStore.user?.userToken
      const userToken = '110000d'
      const linkToken = '3'
      await userCardResponseStore.fetchResponsesForLink(userToken, linkToken)
      setCurrentIndex(0)
      setLoading(false)
    }
    fetchCards()
  }, [linkToken])

  const handleResponse = (response: "yes" | "no") => {
    const currentCard = userCardResponseStore.responses[currentIndex]
    userCardResponseStore.setResponse({ ...currentCard, response })

    if (currentIndex < userCardResponseStore.responses.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(userCardResponseStore.responses.length) // Finished
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  const currentCard = userCardResponseStore.responses[currentIndex]

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Cards</Text>

      {currentCard ? (
        <>
          <AspectCard card={currentCard} />
          <View style={{ flexDirection: "row", marginTop: 24 }}>
            <Pressable
              onPress={() => handleResponse("no")}
              style={{ backgroundColor: "red", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 999, marginRight: 12 }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>No</Text>
            </Pressable>
            <Pressable
              onPress={() => handleResponse("yes")}
              style={{ backgroundColor: "green", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 999 }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Yes</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Text style={{ marginTop: 20 }}>No more cards.</Text>
      )}
    </View>
  )
})
