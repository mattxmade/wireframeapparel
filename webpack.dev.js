const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    historyApiFallback: true,
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
