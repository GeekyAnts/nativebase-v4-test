const path = require("path");
const myBabel = require("../../src/index.js");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      process.env.NODE_ENV === "production" ? myBabel : {},
      [
        "module-resolver",
        {
          alias: {
            // For development, we want to alias the library to the source
            ["@native-base/babel-token-resolver"]: path.join(
              __dirname,
              "../../src/index.js"
            ),
          },
        },
      ],
      "transform-remove-console",
    ],
  };
};
