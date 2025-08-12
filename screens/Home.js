import React, { useMemo, useState } from "react";
import { View, FlatList } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { NFTCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import { useFavorites } from "../store/favorites";
import { useNFTs } from "../store/nfts";

const TAB_HEIGHT = 58 + 8;

export default function Home() {
  const { list } = useNFTs();
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const { isFav, count } = useFavorites();
  const insets = useSafeAreaInsets();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? list.filter((i) => i.name.toLowerCase().includes(q))
      : list;
    return favoritesOnly ? base.filter((i) => isFav(i.id)) : base;
  }, [query, list, favoritesOnly, isFav]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={filtered}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: insets.bottom + TAB_HEIGHT + 16,
            }}
            ListHeaderComponent={<HomeHeader onSearch={setQuery} />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
