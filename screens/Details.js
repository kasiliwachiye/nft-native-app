import React, { useMemo, useState } from "react";
import { View, Text, Image, StatusBar, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { COLORS, SIZES, assets, FONTS } from "../constants";
import {
  CircleButton,
  RectButton,
  SubInfo,
  DetailsDesc,
  DetailsBid,
  FocusedStatusBar,
} from "../components";
import { NFTTitle } from "../components/SubInfo";
import { useNFTs } from "../store/nfts";
import { useWallet } from "../store/wallet";
import { useUser } from "../store/user";
import { useFavorites } from "../store/favorites";
import BidModal from "../components/BidModal";

const DetailsHeader = ({ data, navigation }) => {
  const { isFav, toggle } = useFavorites();
  const active = isFav(data.id);

  return (
    <View
      style={{
        width: "100%",
        aspectRatio: 4 / 3,
        backgroundColor: COLORS.gray,
      }}
    >
      <Image
        source={data.image}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />

      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={StatusBar.currentHeight + 10}
      />

      <CircleButton
        imgUrl={assets.heart}
        right={15}
        top={StatusBar.currentHeight + 10}
        tintColor={active ? COLORS.heartActive : COLORS.heartDefault}
        handlePress={() => toggle(data.id)}
      />
    </View>
  );
};

export default function Details({ route, navigation }) {
  const { id: idParam, data: dataParam } = route.params || {};
  const { getById, placeBid } = useNFTs();
  const { balance, canAfford, spend } = useWallet();
  const { user } = useUser();
  const tabBarHeight = useBottomTabBarHeight();

  const data = useMemo(
    () => (dataParam && dataParam.id ? dataParam : getById(idParam)),
    [dataParam, idParam, getById]
  );
  const [showBid, setShowBid] = useState(false);

  const ended = data?.endAt && Date.now() >= data.endAt;

  const handleSubmitBid = (amount) => {
    if (!canAfford(amount)) {
      Alert.alert(
        "Insufficient funds",
        `Your balance is ${balance.toFixed(2)}`
      );
      return;
    }
    spend(amount, `Bid on ${data.name}`);
    placeBid({ id: data.id, amount, bidder: user });
    setShowBid(false);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      edges={["left", "right"]}
    >
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Sticky CTA above tab bar */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: tabBarHeight + 16,
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <RectButton
          minWidth={220}
          fontSize={SIZES.large}
          onPress={() => setShowBid(true)}
          disabled={ended}
          style={{ opacity: ended ? 0.5 : 1 }}
        >
          {ended ? "Auction ended" : "Place a bid"}
        </RectButton>
      </View>

      <FlatList
        data={data.bids}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DetailsBid bid={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 120 }}
        ListHeaderComponent={() => (
          <>
            <DetailsHeader data={data} navigation={navigation} />

            {/* Meta section - title with pressable creator, plus timer row */}
            <View
              style={{
                backgroundColor: COLORS.surface,
                padding: SIZES.large,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: COLORS.line,
              }}
            >
              <NFTTitle
                title={data.name}
                subTitle={data.creator}
                titleSize={20}
                subTitleSize={14}
              />

              <View style={{ height: 12 }} />
              <SubInfo endAt={data.endAt} />
            </View>

            {/* Description - no duplicate title here */}
            <View style={{ padding: SIZES.large }}>
              <DetailsDesc data={data} />
              {data.bids.length > 0 && (
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.text,
                  }}
                >
                  Current bids
                </Text>
              )}
            </View>
          </>
        )}
      />

      <BidModal
        visible={showBid}
        onClose={() => setShowBid(false)}
        onSubmit={handleSubmitBid}
        current={data.price}
      />
    </SafeAreaView>
  );
}
