const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

process.env.LOCATION = 'http://localhost:3000'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.js'],
  mode: process.env.NODE_ENV,
  target: isProd ? 'browserslist' : 'web',
  output: {
    filename: '[id].[contenthash].js',
    path: path.resolve(__dirname, 'docs')
  },
  resolve: {
    alias: {
      core: path.resolve(__dirname, 'core'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 3000,
    hot: !isProd
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[id].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'docs/assets')
      }],
    }),
    ...['index', 'health', 'beauty', 'enjoy', 'car'].map(page => {
      return new HTMLWebpackPlugin({
        filename: `${ page }.html`,
        template: `!!ejs-compiled-loader!src/views/${ page }.ejs`,
      });
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      { 
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
          options: {
            htmlmin: !isProd,
            htmlminOptions: {
              removeComments: !isProd
            }
          }
        },
      }
    ]
  }
};