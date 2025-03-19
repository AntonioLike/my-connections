import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./features/auth/AuthScreen";
import MainScreen from "./features/main/MainScreen";
import ProtectedRoute from "./components/ProtectedRoute";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main">
        {() => (
          <ProtectedRoute>
            <MainScreen />
          </ProtectedRoute>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
