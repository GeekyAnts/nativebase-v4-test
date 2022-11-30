import * as React from "react";
import { H1 } from "@expo/html-elements";
// import {
//   TouchableOpacity,
//   StyleSheet,
//   GestureResponderEvent,
//   Text,
// } from "react-native";
import { withH1 } from "styled";

export interface H1Props {
  text: string;
  // text?: (event: GestureResponderEvent) => void;
}

export function H1Custom({ text }: H1Props) {
  const H1Styled = withH1(H1);
  return <H1Styled>{text}</H1Styled>;
}
