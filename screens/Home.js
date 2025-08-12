import React, { useMemo, useState } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { NFTCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import { useFavorites } from "../store/favorites";
import { useNFTs } from "../store/nfts";

export default function Home() {
  const { list } = useNFTs();
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const { isFav, count } = useFavorites();
  const tabBarHeight = useBottomTabBarHeight();

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
            contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}
            ListHeaderComponent={
              <HomeHeader
                onSearch={setQuery}
                favoritesOnly={favoritesOnly}
                onToggleFavorites={() => setFavoritesOnly((p) => !p)}
                favCount={count}
              />
            }
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
