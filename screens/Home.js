import { useMemo, useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NFTCard, HomeHeader, FocusedStatusBar } from "../components";
import { COLORS, NFTData, SIZES } from "../constants";

export default function Home() {
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NFTData;
    return NFTData.filter((it) => it.name.toLowerCase().includes(q));
  }, [query]);

  const renderItem = useCallback(({ item }) => <NFTCard data={item} />, []);
  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        <View style={styles.listLayer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <HomeHeader query={query} onChangeSearch={setQuery} />
            }
            ListEmptyComponent={
              <View style={styles.empty}>
                {/* lightweight empty state without text dependency */}
              </View>
            }
            contentContainerStyle={styles.content}
          />
        </View>

        <View pointerEvents="none" style={styles.bg}>
          <View style={styles.bgTop} />
          <View style={styles.bgBottom} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },
  listLayer: { zIndex: 0 },
  content: { paddingBottom: SIZES.extraLarge * 2 },
  empty: { height: 24 },
  bg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  bgTop: { height: 300, backgroundColor: COLORS.primary },
  bgBottom: { flex: 1, backgroundColor: COLORS.white },
});
