import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants";

export const CircleButton = ({
  imgUrl,
  handlePress,
  onPress,
  tintColor,
  ...props
}) => {
  const press = onPress ?? handlePress;
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
        ...props,
      }}
      onPress={press}
      activeOpacity={0.8}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor }}
      />
    </TouchableOpacity>
  );
};

export const RectButton = ({
  minWidth,
  fontSize,
  handlePress,
  onPress,
  children,
  ...props
}) => {
  const press = onPress ?? handlePress;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        padding: SIZES.small,
        borderRadius: SIZES.extraLarge,
        minWidth,
        ...props,
      }}
      onPress={press}
      activeOpacity={0.85}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        {children ?? "Place a bid"}
      </Text>
    </TouchableOpacity>
  );
};
