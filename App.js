import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from './app/features/card/Card';



export default function App() {
  console.log("app Start");
  return (
    <View style={styles.container}>
      <Text>TheSmorgasBord</Text>
      <Card/>
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
