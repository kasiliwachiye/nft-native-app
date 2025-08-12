import "react-native-gesture-handler";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import Home from "./screens/Home";
import Details from "./screens/Details";
import Profile from "./screens/Profile";
import Wallet from "./screens/Wallet";

import { FavoritesProvider } from "./store/favorites";
import { UserProvider } from "./store/user";
import { WalletProvider } from "./store/wallet";
import { NFTsProvider } from "./store/nfts";

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "transparent" },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UserProvider>
          <WalletProvider>
            <NFTsProvider>
              <FavoritesProvider>
                <NavigationContainer theme={theme}>
                  <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Home"
                  >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Details" component={Details} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Wallet" component={Wallet} />
                  </Stack.Navigator>
                </NavigationContainer>
              </FavoritesProvider>
            </NFTsProvider>
          </WalletProvider>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
