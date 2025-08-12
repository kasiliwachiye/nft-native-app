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
  const { isFav } = useFavorites();
  const tabBarHeight = useBottomTabBarHeight();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? list.filter((i) => i.name.toLowerCase().includes(q)) : list;
  }, [query, list]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      edges={["left", "right"]}
    >
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.surface}
      />
      <HomeHeader onSearch={setQuery} />
      <View style={{ flex: 1 }}>
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
      </View>
    </SafeAreaView>
  );
}
