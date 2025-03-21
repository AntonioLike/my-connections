import { Text, View, Button } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome to the app!</Text>
      <Button title="Go to Login" onPress={() => router.push('/features/auth/AuthScreen')} />
    </View>
  );
}
