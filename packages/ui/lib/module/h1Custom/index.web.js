import * as React from "react";
import { H1 } from "@expo/html-elements";
// import {
//   TouchableOpacity,
//   StyleSheet,
//   GestureResponderEvent,
//   Text,
// } from "react-native";
import { withH1 } from "styled";
export function H1Custom(_ref) {
  let {
    text
  } = _ref;
  const H1Styled = withH1(H1);
  return /*#__PURE__*/React.createElement(H1Styled, null, text);
}
//# sourceMappingURL=index.web.js.map