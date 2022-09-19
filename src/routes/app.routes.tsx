import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Game } from "../pages/Game";
import { Home } from "../pages/Home";
const Stack = createNativeStackNavigator();
export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="game" component={Game} />
    </Stack.Navigator>
  );
}
