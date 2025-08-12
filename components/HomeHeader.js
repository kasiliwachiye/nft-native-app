import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";

export default function HomeHeader({ query, onChangeSearch }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Image source={assets.logo} resizeMode="contain" style={styles.logo} />
        <View style={styles.avatarWrap}>
          <Image
            source={assets.person01}
            resizeMode="contain"
            style={styles.avatar}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={styles.badge}
          />
        </View>
      </View>

      <View style={styles.greeting}>
        <Text style={styles.hello}>Hello Victoria 👋</Text>
        <Text style={styles.title}>Let’s find masterpiece Art</Text>
      </View>

      <View style={styles.searchWrap}>
        <Image
          source={assets.search}
          resizeMode="contain"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search NFTs"
          value={query}
          onChangeText={onChangeSearch}
          returnKeyType="search"
          style={styles.input}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: COLORS.primary, padding: SIZES.font },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 90, height: 25 },
  avatarWrap: { width: 45, height: 45 },
  avatar: { width: "100%", height: "100%" },
  badge: { position: "absolute", width: 15, height: 15, bottom: 0, right: 0 },
  greeting: { marginVertical: SIZES.font },
  hello: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
    marginTop: SIZES.base / 2,
  },
  searchWrap: {
    marginTop: SIZES.font,
    width: "100%",
    borderRadius: SIZES.font,
    backgroundColor: COLORS.gray,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.small - 2,
  },
  searchIcon: { width: 20, height: 20, marginRight: SIZES.base },
  input: { flex: 1 },
});
