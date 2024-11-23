const path = require("path");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "development",
  cache: {
    type: "filesystem",
    // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    name: "development-cache", // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
  },
  devServer: {
    port: 9000,
    host: "0.0.0.0",
    allowedHosts: "all",
    compress: false,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public')
    }
  },
  optimization: {
    moduleIds: "deterministic",
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
});
