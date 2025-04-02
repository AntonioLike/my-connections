// app/_layout.tsx
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    console.log()
    if (isAuthenticated === null) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('./(auth)/auth');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('./(screens)/index');
    }
  }, [isAuthenticated, segments]);

  return (
    <View style={{ flex: 1 }}>
      <MyHeader />
      <View style={{ flex: 1 }}>
        <Slot /> {/* renders the actual screen */}
      </View>
      <MyFooter />
    </View>
  );
}

const MyHeader = () => (
  <View style={{ padding: 10, backgroundColor: '#eee' }}>
    <Text style={{ fontWeight: 'bold' }}>🌐 My App Header</Text>
  </View>
);

const MyFooter = () => (
  <View style={{ padding: 10, backgroundColor: '#eee' }}>
    <Text style={{ textAlign: 'center' }}>© 2025 My App</Text>
  </View>
);
