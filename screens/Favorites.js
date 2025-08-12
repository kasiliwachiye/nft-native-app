import React, { useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { FocusedStatusBar, NFTCard } from "../components";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { useFavorites } from "../store/favorites";
import { useNFTs } from "../store/nfts";

export default function Favorites() {
  const { list } = useNFTs();
  const { isFav, all, count, reset } = useFavorites();
  const [query, setQuery] = useState("");
  const timer = useRef(null);
  const tabBarHeight = useBottomTabBarHeight();

  const favorites = useMemo(
    () => list.filter((n) => isFav(n.id)),
    [list, isFav]
  );
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? favorites.filter((n) => n.name.toLowerCase().includes(q))
      : favorites;
  }, [favorites, query]);

  const handleSearch = (txt) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setQuery(txt), 250);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      edges={["left", "right"]}
    >
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.surface}
      />

      <View
        style={{
          backgroundColor: COLORS.surface,
          borderBottomWidth: 1,
          borderColor: COLORS.line,
          padding: SIZES.large,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontFamily: FONTS.semiBold,
              fontSize: 22,
            }}
          >
            Favorites
          </Text>
          {count > 0 && (
            <TouchableOpacity
              onPress={reset}
              activeOpacity={0.85}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: COLORS.line,
              }}
            >
              <Text style={{ color: COLORS.text, fontFamily: FONTS.medium }}>
                Clear
              </Text>
            </TouchableOpacity>
          )}
        </View>

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
            placeholder="Search favorites"
            placeholderTextColor={COLORS.muted}
            style={{ flex: 1, fontFamily: FONTS.regular, color: COLORS.text }}
            onChangeText={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <NFTCard data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: tabBarHeight + 24,
          paddingTop: 8,
        }}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ color: COLORS.muted, fontFamily: FONTS.regular }}>
              {all.length === 0 ? "No favorites yet" : "No results"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
