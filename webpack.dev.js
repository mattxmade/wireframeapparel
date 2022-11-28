const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});

/**
 * devServer loses context on refresh
 *
 * https://stackoverflow.com/a/37449679
 * https://stackoverflow.com/a/49760742
 * https://stackoverflow.com/a/48568560
 *
 */
