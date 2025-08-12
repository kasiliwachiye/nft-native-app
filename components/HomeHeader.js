import React, { useRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useWallet } from "../store/wallet";

export default function HomeHeader({
  onSearch,
  favoritesOnly,
  onToggleFavorites,
  favCount,
}) {
  const nav = useNavigation();
  const { balance } = useWallet();
  const timer = useRef(null);

  const handleText = (txt) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch?.(txt), 250);
  };

  return (
    <View style={{ backgroundColor: COLORS.primary, padding: SIZES.font }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => nav.navigate("Wallet")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={assets.eth}
            resizeMode="contain"
            style={{ width: 18, height: 18, marginRight: 6 }}
          />
          <Text style={{ color: "#fff", fontFamily: FONTS.medium }}>
            {balance.toFixed(2)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 45, height: 45 }}
          activeOpacity={0.8}
          onPress={() => nav.navigate("Profile")}
        >
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{
              position: "absolute",
              width: 15,
              height: 15,
              bottom: 0,
              right: 0,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          Hello Victoria 👋
        </Text>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.large,
            color: COLORS.white,
            marginTop: SIZES.base / 2,
          }}
        >
          Let’s find masterpiece Art
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small - 2,
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{ width: 20, height: 20, marginRight: SIZES.base }}
          />
          <TextInput
            placeholder="Search NFTs"
            style={{ flex: 1 }}
            onChangeText={handleText}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggleFavorites}
        style={{
          alignSelf: "flex-start",
          marginTop: 8,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: SIZES.font,
          backgroundColor: favoritesOnly
            ? "rgba(255,255,255,0.18)"
            : "transparent",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.25)",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: SIZES.small,
            color: COLORS.white,
          }}
        >
          {favoritesOnly
            ? `Showing Favorites (${favCount})`
            : `Favorites (${favCount})`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
