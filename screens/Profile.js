import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FocusedStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{ padding: SIZES.large }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={user.avatar}
            style={{ width: 96, height: 96, borderRadius: 48 }}
          />
          <Text
            style={{ fontFamily: FONTS.semiBold, fontSize: 20, marginTop: 8 }}
          >
            {user.name}
          </Text>
          <Text style={{ color: "#6b7280" }}>{user.handle}</Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontFamily: FONTS.medium, marginBottom: 6 }}>
            Name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              borderRadius: 12,
              padding: 12,
            }}
          />

          <Text
            style={{
              fontFamily: FONTS.medium,
              marginVertical: 6,
              marginTop: 14,
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
              borderColor: "#e5e7eb",
              borderRadius: 12,
              padding: 12,
            }}
          />

          <TouchableOpacity
            onPress={() => update({ name, handle })}
            style={{
              backgroundColor: COLORS.primary,
              padding: 14,
              borderRadius: 12,
              marginTop: 16,
            }}
            activeOpacity={0.9}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: FONTS.semiBold,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 28,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 18 }}>
              {count}
            </Text>
            <Text style={{ color: "#6b7280" }}>Favorites</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
