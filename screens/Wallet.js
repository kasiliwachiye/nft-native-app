import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";

import { useWallet } from "../store/wallet";

export default function Wallet() {
  const { address, balance, txs, topUp } = useWallet();
  const [amt, setAmt] = useState("");

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      edges={["top", "left", "right"]}
    >
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.surface}
      />

      <View
        style={{
          backgroundColor: COLORS.surface,
          borderBottomWidth: 1,
          borderColor: COLORS.line,
          padding: SIZES.large,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: 22,
            color: COLORS.text,
          }}
        >
          Wallet
        </Text>
        <Text style={{ color: COLORS.muted, marginTop: 4 }}>{address}</Text>
      </View>

      <View style={{ padding: SIZES.large }}>
        <View
          style={{
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.line,
            borderRadius: SIZES.radius,
            padding: 16,
          }}
        >
          <Text style={{ fontFamily: FONTS.medium, color: COLORS.muted }}>
            Balance
          </Text>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 28,
              color: COLORS.text,
              marginTop: 4,
            }}
          >
            {balance.toFixed(2)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 14, gap: 10 }}>
          <TextInput
            value={amt}
            onChangeText={setAmt}
            keyboardType="numeric"
            placeholder="Amount"
            placeholderTextColor={COLORS.muted}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: COLORS.line,
              borderRadius: SIZES.radius,
              padding: 12,
              backgroundColor: COLORS.surface,
              color: COLORS.text,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              const v = Number(amt);
              if (!Number.isNaN(v) && v > 0) topUp(v);
              setAmt("");
            }}
            style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 16,
              borderRadius: 999,
              justifyContent: "center",
            }}
            activeOpacity={0.9}
          >
            <Text style={{ color: COLORS.white, fontFamily: FONTS.semiBold }}>
              Top up
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            marginTop: 20,
            fontFamily: FONTS.semiBold,
            color: COLORS.text,
          }}
        >
          Transactions
        </Text>
        <View
          style={{
            marginTop: 8,
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.line,
            borderRadius: SIZES.radius,
          }}
        >
          <FlatList
            data={txs}
            keyExtractor={(i) => i.id}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: COLORS.line }} />
            )}
            renderItem={({ item }) => (
              <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
                <Text style={{ fontFamily: FONTS.medium, color: COLORS.text }}>
                  {item.type === "debit" ? "Bid" : "Top up"} •{" "}
                  {item.amount.toFixed(2)}
                </Text>
                <Text style={{ color: COLORS.muted }}>{item.note}</Text>
                <Text style={{ color: COLORS.muted, fontSize: 12 }}>
                  {new Date(item.at).toLocaleString()}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
