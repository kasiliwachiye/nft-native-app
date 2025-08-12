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
        width: 38,
        height: 38,
        backgroundColor: COLORS.surface,
        position: "absolute",
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.line,
        ...SHADOWS.soft,
        ...props,
      }}
      onPress={press}
      activeOpacity={0.85}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 22, height: 22, tintColor }}
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
  style,
  ...props
}) => {
  const press = onPress ?? handlePress;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 999,
        minWidth,
        alignItems: "center",
        ...style,
      }}
      onPress={press}
      activeOpacity={0.88}
      {...props}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize,
          color: COLORS.white,
        }}
      >
        {children ?? "Continue"}
      </Text>
    </TouchableOpacity>
  );
};
