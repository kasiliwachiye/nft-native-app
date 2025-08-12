import { Pressable, Text, Image, StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, SHADOWS } from "../constants";

export const CircleButton = ({
  imgUrl,
  handlePress,
  onPress,
  ...styleProps
}) => {
  const press = onPress ?? handlePress;
  return (
    <Pressable style={[styles.circle, styleProps]} onPress={press} hitSlop={8}>
      <Image source={imgUrl} resizeMode="contain" style={styles.circleIcon} />
    </Pressable>
  );
};

export const RectButton = ({
  minWidth,
  fontSize,
  handlePress,
  onPress,
  ...styleProps
}) => {
  const press = onPress ?? handlePress;
  return (
    <Pressable style={[styles.rect, { minWidth }, styleProps]} onPress={press}>
      <Text style={[styles.rectText, { fontSize }]}>Place a bid</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    position: "absolute",
    borderRadius: SIZES.extraLarge,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.light,
  },
  circleIcon: { width: 24, height: 24 },
  rect: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.extraLarge,
  },
  rectText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    textAlign: "center",
  },
});
