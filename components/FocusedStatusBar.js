import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/core";

export default function FocusedStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar animated {...props} /> : null;
}
