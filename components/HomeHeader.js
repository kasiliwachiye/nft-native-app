import React, { useRef } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useWallet } from "../store/wallet";

export default function HomeHeader({ onSearch }) {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();
  const { balance } = useWallet();
  const timer = useRef(null);

  const handleText = (txt) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch?.(txt), 250);
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.surface,
        paddingTop: insets.top + SIZES.base,
        paddingHorizontal: SIZES.large,
        paddingBottom: SIZES.base,
        borderBottomWidth: 1,
        borderColor: COLORS.line,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: SIZES.base,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: 20,
            color: COLORS.text,
          }}
        >
          Discover
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => nav.navigate("WalletTab")}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: COLORS.gray,
            }}
          >
            <Text style={{ color: COLORS.text, fontFamily: FONTS.medium }}>
              {balance.toFixed(2)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => nav.navigate("ProfileTab")}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: COLORS.line,
            }}
          >
            <Image
              source={assets.person01}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search pill */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.gray,
          borderRadius: 999,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}
      >
        <Image
          source={assets.search}
          resizeMode="contain"
          style={{ width: 18, height: 18, marginRight: 8, opacity: 0.8 }}
        />
        <TextInput
          placeholder="Search art, creators, prices"
          placeholderTextColor={COLORS.muted}
          style={{
            flex: 1,
            fontFamily: FONTS.regular,
            color: COLORS.text,
            fontSize: 16,
          }}
          onChangeText={handleText}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
}
