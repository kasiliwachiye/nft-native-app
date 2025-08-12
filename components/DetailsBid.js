import React from "react";
import { View, Text, Image } from "react-native";

import { EthPrice } from "./SubInfo";
import { COLORS, SIZES, FONTS } from "../constants";

const DetailsBid = ({ bid }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.base + 2,
      }}
      key={bid.id}
    >
      <Image
        source={bid.image}
        resizeMode="cover"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: COLORS.line,
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: SIZES.base }}>
        <Text
          style={{ fontFamily: FONTS.medium, fontSize: 13, color: COLORS.text }}
        >
          Bid by {bid.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 12,
            color: COLORS.muted,
            marginTop: 2,
          }}
        >
          {bid.date}
        </Text>
      </View>
      <EthPrice price={bid.price} />
    </View>
  );
};

export default DetailsBid;
