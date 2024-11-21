const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const lightningcss = require('lightningcss');
const browserslist = require('browserslist');
const CopyPlugin = require("copy-webpack-plugin")

module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    output: {
      clean: true,
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[contenthash][ext]',
    },
    plugins: [
      // 打包分析
      // new BundleAnalyzerPlugin(),
      // 生成 manifest.json
      new WebpackManifestPlugin(),
      // 将 css 从 js 中分离
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../public'), // 复制public下文件
            to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
            filter: source => {
              return !source.includes('index.html') // 忽略index.html
            }
          },
        ],
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin({
          minify: CssMinimizerPlugin.lightningCssMinify,
          minimizerOptions: {
            targets: lightningcss.browserslistToTargets(browserslist('>= 0.25%'))
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libAntd: {
            test: /[\\/]node_modules[\\/]antd[\\/]/, // 匹配 antd 库
            name: 'lib-antd', // 输出的文件名
            priority: 20, // 优先级，数值越大优先级越高
            reuseExistingChunk: true, // 复用已存在的 chunk
          },
          libLodash: {
            test: /[\\/]node_modules[\\/]antd[\\/]/, // 匹配 antd 库
            name: 'lib-lodash', // 输出的文件名
            priority: 20, // 优先级，数值越大优先级越高
            reuseExistingChunk: true, // 复用已存在的 chunk
          },
        },
      },
    },
  });
}