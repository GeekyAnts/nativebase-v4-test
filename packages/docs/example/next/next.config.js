/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  resolve: {
    "@native-base/docs-test": path.resolve(__dirname, "../../"),
  },
};

const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "solito",
  "@native-base/docs-test",
]);

module.exports = withPlugins(
  [withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig
);

// module.exports = () => {
//   const plugins = [withTM, withExpo];
//   return plugins.reduce((config, plugin) => plugin(config), nextConfig);
// };
