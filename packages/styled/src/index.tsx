import { View, Text } from "react-native";
import React from "react";

export function withH1(Component: any) {
  return ({ ...props }) => {
    return <Component {...props} />;
  };
}
