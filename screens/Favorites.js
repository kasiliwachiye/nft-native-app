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
    if (!q) return favorites;
    return favorites.filter((n) => n.name.toLowerCase().includes(q));
  }, [favorites, query]);

  const handleSearch = (txt) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setQuery(txt), 250);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />

      <View
        style={{
          backgroundColor: COLORS.primary,
          paddingHorizontal: SIZES.font,
          paddingBottom: SIZES.font,
          paddingTop: SIZES.font,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontFamily: FONTS.bold, fontSize: 22 }}>
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
                borderColor: "rgba(255,255,255,0.25)",
              }}
            >
              <Text style={{ color: "#fff", fontFamily: FONTS.medium }}>
                Clear
              </Text>
            </TouchableOpacity>
          )}
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
              placeholder="Search favorites"
              style={{ flex: 1 }}
              onChangeText={handleSearch}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <NFTCard data={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text
                style={{ color: COLORS.secondary, fontFamily: FONTS.regular }}
              >
                {all.length === 0 ? "No favorites yet" : "No matches"}
              </Text>
            </View>
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
        <View style={{ height: 220, backgroundColor: COLORS.primary }} />
        <View style={{ flex: 1, backgroundColor: COLORS.white }} />
      </View>
    </SafeAreaView>
  );
}
