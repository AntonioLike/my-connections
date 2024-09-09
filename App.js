import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SwipeDeck from './app/features/swiping-deck/SwipingDeck';

export default function App() {
  console.log("app Start");
  return (
    <View style={styles.container}>
      <Text>TheSmorgasBord</Text>
      <SwipeDeck
      firstCardId={0}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
