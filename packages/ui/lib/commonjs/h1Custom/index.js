"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.H1Custom = H1Custom;
var React = _interopRequireWildcard(require("react"));
var _htmlElements = require("@expo/html-elements");
var _styled = require("styled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// import {
//   TouchableOpacity,
//   StyleSheet,
//   GestureResponderEvent,
//   Text,
// } from "react-native";

function H1Custom(_ref) {
  let {
    text
  } = _ref;
  const H1Styled = (0, _styled.withH1)(_htmlElements.H1);
  return /*#__PURE__*/React.createElement(H1Styled, null, text);
}
//# sourceMappingURL=index.js.map