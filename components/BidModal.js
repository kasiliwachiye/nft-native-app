import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

export default function BidModal({
  visible,
  onClose,
  onSubmit,
  current,
  minIncrement = 0.05,
}) {
  const [value, setValue] = useState("");

  const min = Number((Number(current) + minIncrement).toFixed(2));
  const num = Number(value);

  const valid = !Number.isNaN(num) && num >= min;

  const submit = () => {
    if (!valid) return;
    onSubmit(num);
    setValue("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: SIZES.large,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.large,
              color: COLORS.primary,
            }}
          >
            Place a bid
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: COLORS.secondary,
              fontFamily: FONTS.regular,
            }}
          >
            Current {current} • Min {min}
          </Text>

          <View
            style={{
              marginTop: 12,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <TextInput
              keyboardType="numeric"
              placeholder="Enter amount"
              value={value}
              onChangeText={setValue}
              style={{ fontSize: 18 }}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 14, gap: 12 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                backgroundColor: "#f3f4f6",
              }}
              activeOpacity={0.85}
            >
              <Text style={{ textAlign: "center", fontFamily: FONTS.medium }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submit}
              disabled={!valid}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                backgroundColor: valid ? COLORS.primary : "#9aa4aa",
              }}
              activeOpacity={0.85}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: FONTS.semiBold,
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
