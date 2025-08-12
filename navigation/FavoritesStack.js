import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Favorites from "../screens/Favorites";
import Details from "../screens/Details";

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
