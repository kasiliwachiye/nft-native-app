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
      <View style={styles.media}>
        <Image source={data.image} resizeMode="cover" style={styles.image} />
        <CircleButton
          imgUrl={assets.heart}
          right={10}
          top={10}
          tintColor={active ? "#e11d48" : undefined}
          handlePress={() => toggle(data.id)}
        />
      </View>

      <SubInfo endAt={data.endAt} />

      <View style={styles.body}>
        <NFTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
        <View style={styles.row}>
          <EthPrice price={data.price} />
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            onPress={() => navigation.navigate("Details", { id: data.id })}
          />
        </View>
      </View>
    </View>
  );
}

export default memo(NFTCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark,
  },
  media: { width: "100%", height: 250 },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: SIZES.font,
    borderTopRightRadius: SIZES.font,
  },
  body: { width: "100%", padding: SIZES.font },
  row: {
    marginTop: SIZES.font,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
