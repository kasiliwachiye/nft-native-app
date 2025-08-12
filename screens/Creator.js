import React, { useMemo, useRef, useState } from "react";
import { View, Text, TextInput, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { FocusedStatusBar, NFTCard } from "../components";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useNFTs } from "../store/nfts";

export default function Creator({ route }) {
  const { name } = route.params || {};
  const { list } = useNFTs();
  const tabBarHeight = useBottomTabBarHeight();

  const [query, setQuery] = useState("");
  const timer = useRef(null);

  const items = useMemo(() => list.filter((n) => n.creator === name), [list, name]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.name.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const handleSearch = (txt) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setQuery(txt), 250);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      edges={["top", "left", "right"]}
    >
      <FocusedStatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View
        style={{
          backgroundColor: COLORS.surface,
          borderBottomWidth: 1,
          borderColor: COLORS.line,
          padding: SIZES.large,
        }}
      >
        <Text style={{ fontFamily: FONTS.semiBold, fontSize: 22, color: COLORS.text }}>
          {name}
        </Text>

        <View
          style={{
            marginTop: SIZES.base,
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
            placeholder={`Search ${name}'s art`}
            placeholderTextColor={COLORS.muted}
            style={{ flex: 1, fontFamily: FONTS.regular, color: COLORS.text }}
            onChangeText={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        renderItem={({ item }) => <NFTCard data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: tabBarHeight + 24,
          paddingTop: 8,
        }}
      />
    </SafeAreaView>
  );
}
