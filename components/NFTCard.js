import React, { memo } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, EthPrice, NFTTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";
import { useFavorites } from "../store/favorites";

function NFTCard({ data }) {
  const navigation = useNavigation();
  const { isFav, toggle } = useFavorites();
  const active = isFav(data.id);

  return (
    <View style={styles.card}>
      <View style={styles.mediaWrap}>
        <Image source={data.image} resizeMode="cover" style={styles.media} />
        <CircleButton
          imgUrl={assets.heart}
          right={12}
          top={12}
          tintColor={active ? COLORS.heartActive : COLORS.heartDefault}
          handlePress={() => toggle(data.id)}
        />
      </View>

      <View style={styles.content}>
        <NFTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={16}
          subTitleSize={12}
        />
        <View style={styles.row}>
          <EthPrice price={data.price} />
          <SubInfo endAt={data.endAt} compact />
        </View>

        <RectButton
          minWidth={120}
          fontSize={SIZES.font}
          onPress={() => navigation.navigate("Details", { id: data.id })}
          style={{ marginTop: 10 }}
        >
          View details
        </RectButton>
      </View>
    </View>
  );
}

export default memo(NFTCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    marginHorizontal: SIZES.large,
    marginTop: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.line,
    ...SHADOWS.card,
  },
  mediaWrap: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderTopLeftRadius: SIZES.radiusLg,
    borderTopRightRadius: SIZES.radiusLg,
    overflow: "hidden",
    backgroundColor: COLORS.gray,
  },
  media: { width: "100%", height: "100%" },
  content: { padding: SIZES.large },
  row: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
