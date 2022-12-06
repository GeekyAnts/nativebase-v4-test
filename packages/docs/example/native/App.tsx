// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import { NativeNavigation } from "@native-base/docs-test/navigation/native";
import { Provider } from "@native-base/docs-test/provider";
// import { Button } from "ui";
// import { ButtonExpo } from "./button-expo";

export default function App() {
  return (
    <Provider>
      <NativeNavigation></NativeNavigation>
    </Provider>
  );
}
