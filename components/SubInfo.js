import React, { useEffect, useMemo, useState } from "react";
import { View, Image, Text } from "react-native";
import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";

export const NFTTitle = ({ title, subTitle, titleSize, subTitleSize }) => (
  <View>
    <Text
      style={{
        fontFamily: FONTS.semiBold,
        fontSize: titleSize,
        color: COLORS.primary,
      }}
    >
      {title}
    </Text>
    <Text
      style={{
        fontFamily: FONTS.regular,
        fontSize: subTitleSize,
        color: COLORS.primary,
      }}
    >
      by {subTitle}
    </Text>
  </View>
);

export const EthPrice = ({ price }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Image
      source={assets.eth}
      resizeMode="contain"
      style={{ width: 20, height: 20, marginRight: 2 }}
    />
    <Text
      style={{
        fontFamily: FONTS.medium,
        fontSize: SIZES.font,
        color: COLORS.primary,
      }}
    >
      {price}
    </Text>
  </View>
);

const ImageCmp = ({ imgUrl, index }) => (
  <Image
    source={imgUrl}
    resizeMode="contain"
    style={{ width: 48, height: 48, marginLeft: index === 0 ? 0 : -SIZES.font }}
  />
);

export const People = () => (
  <View style={{ flexDirection: "row" }}>
    {[assets.person02, assets.person03, assets.person04].map(
      (imgUrl, index) => (
        <ImageCmp imgUrl={imgUrl} index={index} key={`People-${index}`} />
      )
    )}
  </View>
);

function formatRemain(ms) {
  if (ms <= 0) return "Ended";
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  if (h >= 1) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m ${String(ss).padStart(2, "0")}s`;
}

export const EndDate = ({ endAt }) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const remain = useMemo(() => formatRemain((endAt || 0) - now), [endAt, now]);

  return (
    <View
      style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%",
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.primary,
        }}
      >
        Ending in
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
        }}
      >
        {remain}
      </Text>
    </View>
  );
};

export const SubInfo = ({ endAt }) => (
  <View
    style={{
      width: "100%",
      paddingHorizontal: SIZES.font,
      marginTop: -SIZES.extraLarge,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <People />
    <EndDate endAt={endAt} />
  </View>
);
