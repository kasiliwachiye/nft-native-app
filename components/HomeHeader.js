import React, { useRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

import { COLORS, FONTS, SIZES, assets } from "../constants";

export default function HomeHeader({
  onSearch,
  favoritesOnly,
  onToggleFavorites,
  favCount,
}) {
  // light debounce so filtering is not too chatty
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
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: 90, height: 25 }}
        />

        <View style={{ width: 45, height: 45 }}>
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
        </View>
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
