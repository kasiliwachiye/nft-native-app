import React, { useState } from "react";
import { View, Text } from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";

export default function DetailsDesc({ data, initialChars = 140 }) {
  const [expanded, setExpanded] = useState(false);
  const short = data.description.slice(0, initialChars);
  const body = expanded ? data.description : short;
  const canToggle = data.description.length > initialChars;

  return (
    <View>
      <Text
        style={{
          fontSize: SIZES.font,
          fontFamily: FONTS.semiBold,
          color: COLORS.text,
        }}
      >
        Description
      </Text>

      <View style={{ marginTop: SIZES.base }}>
        <Text
          style={{
            color: COLORS.muted,
            fontSize: SIZES.small,
            fontFamily: FONTS.regular,
            lineHeight: SIZES.large,
          }}
        >
          {body}
          {canToggle && !expanded && "..."}
          {canToggle && (
            <Text
              onPress={() => setExpanded((s) => !s)}
              style={{
                color: COLORS.text,
                fontSize: SIZES.small,
                fontFamily: FONTS.semiBold,
              }}
            >
              {expanded ? " Show less" : " Read more"}
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
}
