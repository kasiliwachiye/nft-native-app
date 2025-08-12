import React, { memo } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";

export const NFTTitle = memo(function NFTTitle({
  title,
  subTitle,
  titleSize,
  subTitleSize,
}) {
  return (
    <View>
      <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
      <Text style={[styles.subTitle, { fontSize: subTitleSize }]}>
        by {subTitle}
      </Text>
    </View>
  );
});

export const EthPrice = memo(function EthPrice({ price }) {
  return (
    <View style={styles.priceRow}>
      <Image source={assets.eth} resizeMode="contain" style={styles.ethIcon} />
      <Text style={styles.priceText}>{price}</Text>
    </View>
  );
});

const ImageCmp = memo(function ImageCmp({ imgUrl, index }) {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={[styles.person, { marginLeft: index === 0 ? 0 : -SIZES.font }]}
    />
  );
});

export const People = memo(function People() {
  return (
    <View style={styles.peopleRow}>
      {[assets.person02, assets.person03, assets.person04].map((imgUrl, i) => (
        <ImageCmp imgUrl={imgUrl} index={i} key={`People-${i}`} />
      ))}
    </View>
  );
});

export const EndDate = memo(function EndDate() {
  return (
    <View style={styles.endWrap}>
      <Text style={styles.endLabel}>Ending in</Text>
      <Text style={styles.endValue}>12h 30m</Text>
    </View>
  );
});

export const SubInfo = memo(function SubInfo() {
  return (
    <View style={styles.subInfo}>
      <People />
      <EndDate />
    </View>
  );
});

const styles = StyleSheet.create({
  title: { fontFamily: FONTS.semiBold, color: COLORS.primary },
  subTitle: { fontFamily: FONTS.regular, color: COLORS.primary },
  priceRow: { flexDirection: "row", alignItems: "center" },
  ethIcon: { width: 20, height: 20, marginRight: 2 },
  priceText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.font,
    color: COLORS.primary,
  },
  person: { width: 48, height: 48 },
  peopleRow: { flexDirection: "row" },
  endWrap: {
    paddingHorizontal: SIZES.font,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
    elevation: 1,
    maxWidth: "50%",
  },
  endLabel: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  endValue: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  subInfo: {
    width: "100%",
    paddingHorizontal: SIZES.font,
    marginTop: -SIZES.extraLarge,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
