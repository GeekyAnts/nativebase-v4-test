const path = require("path");
const myBabel = require("./babel");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      myBabel,
      // [
      //   "module-resolver",
      //   {
      //     alias: {
      //       // For development, we want to alias the library to the source
      //       ["@native-base/styled-test"]: path.join(
      //         __dirname,
      //         "../../../styled/src"
      //       ),
      //     },
      //   },
      // ],
    ],
  };
};
