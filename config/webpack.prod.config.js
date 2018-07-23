const webpack = require('webpack')
const base = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const path = require('path')
module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.(sa|sc)ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'zimarked.min.css',
    }),
  ]
})