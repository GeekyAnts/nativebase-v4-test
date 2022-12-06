const path = require("path");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // For development, we want to alias the library to the source
            ["@native-base/styled-test"]: path.join(__dirname, "../../src"),
          },
        },
      ],
    ],
  };
};
