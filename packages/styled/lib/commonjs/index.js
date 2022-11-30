"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withH1 = withH1;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function withH1(Component) {
  return _ref => {
    let {
      ...props
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(Component, props);
  };
}
//# sourceMappingURL=index.js.map