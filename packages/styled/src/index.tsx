import { View, Text } from "react-native";
import React from "react";

export function withH1(Component: any) {
  const X = Component ?? (() => <div>Hello</div>);
  return ({ ...props }) => {
    return <Component {...props} />;
  };
}
