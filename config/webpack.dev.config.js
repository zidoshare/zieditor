'use strict'
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(base, {
  entry: {
    app: ['webpack-hot-middleware/client', './src/index.ts']
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      favicon: path.resolve(__dirname, './z.png'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [{
      test: /\.(sa|sc)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
})