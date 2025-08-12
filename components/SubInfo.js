import React, { useEffect, useMemo, useState } from "react";
import { View, Image, Text } from "react-native";

import { SIZES, FONTS, COLORS, SHADOWS, assets } from "../constants";

export const NFTTitle = ({ title, subTitle, titleSize, subTitleSize }) => (
  <View>
    <Text
      style={{
        fontFamily: FONTS.semiBold,
        fontSize: titleSize,
        color: COLORS.text,
      }}
    >
      {title}
    </Text>
    <Text
      style={{
        fontFamily: FONTS.regular,
        fontSize: subTitleSize,
        color: COLORS.muted,
      }}
    >
      {subTitle}
    </Text>
  </View>
);

export const EthPrice = ({ price }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: COLORS.gray,
    }}
  >
    <Image
      source={assets.eth}
      resizeMode="contain"
      style={{ width: 16, height: 16, marginRight: 4 }}
    />
    <Text
      style={{ fontFamily: FONTS.medium, fontSize: 13, color: COLORS.text }}
    >
      {price}
    </Text>
  </View>
);

const ImageCmp = ({ imgUrl, index }) => (
  <Image
    source={imgUrl}
    resizeMode="cover"
    style={{
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: COLORS.surface,
      marginLeft: index === 0 ? 0 : -10,
    }}
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

  const ended = remain === "Ended";
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: ended ? "#fee2e2" : COLORS.gray,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: 12,
          color: ended ? "#991b1b" : COLORS.text,
        }}
      >
        {ended ? "Ended" : `Ends in ${remain}`}
      </Text>
    </View>
  );
};

export const SubInfo = ({ endAt, compact }) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
    {!compact && <People />}
    <EndDate endAt={endAt} />
  </View>
);
