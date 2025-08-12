import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";

import { COLORS, SIZES, assets, FONTS } from "../constants";
import {
  CircleButton,
  RectButton,
  SubInfo,
  DetailsDesc,
  DetailsBid,
  FocusedStatusBar,
} from "../components";
import { useNFTs } from "../store/nfts";
import { useWallet } from "../store/wallet";
import { useUser } from "../store/user";
import BidModal from "../components/BidModal";

const DetailsHeader = ({ data, navigation }) => (
  <View style={{ width: "100%", height: 373 }}>
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
    />
  </View>
);

const Details = ({ route, navigation }) => {
  const { id: idParam, data: dataParam } = route.params || {};
  const { list, getById, placeBid } = useNFTs();
  const { balance, canAfford, spend } = useWallet();
  const { user } = useUser();

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
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 1,
        }}
      >
        <RectButton
          minWidth={170}
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
        renderItem={({ item }) => <DetailsBid bid={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.extraLarge * 3 }}
        ListHeaderComponent={() => (
          <>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo endAt={data.endAt} />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc data={data} />
              {data.bids.length > 0 && (
                <Text
                  style={{
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                  }}
                >
                  Current Bid
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
};

export default Details;
