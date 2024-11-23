const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// css/css module 正则表达式
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
// sass/sass module 正则表达式
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),
  // target: "web",
  output: {
    filename: 'static/js/[name].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
  plugins: [
    // 生成 index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
    }),
    new WebpackBar(),
    new DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_NEV),
    }),
    // new Dotenv()
  ],
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".json", ".wasm"],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /.(jsx|js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: [
          'thread-loader',
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  decorators: true,
                  tsx: true
                }
              }
            }
          }
        ]
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          isDevelopment && "style-loader",
          isProduction  && {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader"
        ].filter(Boolean),
      },
      {
        test: cssModuleRegex,
        use: [
          isDevelopment && "style-loader",
          isProduction && {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                localIdentHashSalt: 'hash',
                exportLocalsConvention: 'asIs',
                exportOnlyLocals: false,
              },
            },
          },
          "postcss-loader",
        ].filter(Boolean),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: sassModuleRegex,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                localIdentHashSalt: 'hash',
                exportLocalsConvention: 'asIs',
                exportOnlyLocals: false,
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
};
