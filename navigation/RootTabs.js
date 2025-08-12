import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

import HomeStack from "./HomeStack";
import FavoritesStack from "./FavoritesStack";
import Wallet from "../screens/Wallet";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      sceneContainerStyle={{ backgroundColor: "#fff" }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#9aa4aa",
        tabBarStyle: { height: 58, paddingTop: 6, paddingBottom: 8 },
        tabBarIcon: ({ color, size, focused }) => {
          const map = {
            HomeTab: focused ? "home" : "home-outline",
            FavoritesTab: focused ? "heart" : "heart-outline",
            WalletTab: focused ? "card" : "card-outline",
            ProfileTab: focused ? "person" : "person-outline",
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{ title: "Favorites" }}
      />
      <Tab.Screen
        name="WalletTab"
        component={Wallet}
        options={{ title: "Wallet" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
