import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { useWallet } from "../store/wallet";

export default function Wallet() {
  const { address, balance, txs, topUp } = useWallet();
  const [amt, setAmt] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FocusedStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ padding: SIZES.large }}>
        <Text
          style={{ fontFamily: FONTS.semiBold, fontSize: 22, marginBottom: 8 }}
        >
          Wallet
        </Text>
        <Text style={{ color: "#6b7280" }}>{address}</Text>

        <View
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            backgroundColor: "#f3f4f6",
          }}
        >
          <Text style={{ fontFamily: FONTS.medium, color: "#374151" }}>
            Balance
          </Text>
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 28 }}>
            {balance.toFixed(2)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 14, gap: 10 }}>
          <TextInput
            value={amt}
            onChangeText={setAmt}
            keyboardType="numeric"
            placeholder="Amount"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              borderRadius: 12,
              padding: 12,
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
              borderRadius: 12,
              justifyContent: "center",
            }}
            activeOpacity={0.9}
          >
            <Text style={{ color: "#fff", fontFamily: FONTS.semiBold }}>
              Top up
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{ marginTop: 20, fontFamily: FONTS.semiBold }}>
          Transactions
        </Text>
        <FlatList
          style={{ marginTop: 6 }}
          data={txs}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: "#f3f4f6",
              }}
            >
              <Text style={{ fontFamily: FONTS.medium }}>
                {item.type === "debit" ? "Bid" : "Top up"} •{" "}
                {item.amount.toFixed(2)}
              </Text>
              <Text style={{ color: "#6b7280" }}>{item.note}</Text>
              <Text style={{ color: "#9ca3af", fontSize: 12 }}>
                {new Date(item.at).toLocaleString()}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
