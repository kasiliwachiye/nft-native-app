import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FocusedStatusBar } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { useUser } from "../store/user";
import { useFavorites } from "../store/favorites";

export default function Profile() {
  const { user, update } = useUser();
  const { count } = useFavorites();
  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);

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
          Profile
        </Text>
      </View>

      <View style={{ padding: SIZES.large }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={user.avatar}
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              borderWidth: 1,
              borderColor: COLORS.line,
            }}
          />
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 20,
              marginTop: 8,
              color: COLORS.text,
            }}
          >
            {user.name}
          </Text>
          <Text style={{ color: COLORS.muted }}>{user.handle}</Text>
        </View>

        <View
          style={{
            backgroundColor: COLORS.surface,
            borderWidth: 1,
            borderColor: COLORS.line,
            borderRadius: SIZES.radius,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.medium,
              marginBottom: 6,
              color: COLORS.text,
            }}
          >
            Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: COLORS.line,
              borderRadius: 10,
              padding: 12,
              color: COLORS.text,
              backgroundColor: COLORS.white,
            }}
          />

          <Text
            style={{
              fontFamily: FONTS.medium,
              marginVertical: 10,
              color: COLORS.text,
            }}
          >
            Handle
          </Text>
          <TextInput
            value={handle}
            onChangeText={setHandle}
            autoCapitalize="none"
            style={{
              borderWidth: 1,
              borderColor: COLORS.line,
              borderRadius: 10,
              padding: 12,
              color: COLORS.text,
              backgroundColor: COLORS.white,
            }}
          />

          <TouchableOpacity
            onPress={() => update({ name, handle })}
            style={{
              backgroundColor: COLORS.primary,
              padding: 14,
              borderRadius: 999,
              marginTop: 16,
            }}
            activeOpacity={0.9}
          >
            <Text
              style={{
                textAlign: "center",
                color: COLORS.white,
                fontFamily: FONTS.semiBold,
              }}
            >
              Save changes
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 18,
                color: COLORS.text,
              }}
            >
              {count}
            </Text>
            <Text style={{ color: COLORS.muted }}>Favorites</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
