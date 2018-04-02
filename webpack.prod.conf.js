'use strict'

var merge = require('webpack-merge')
var common = require('./webpack.common.js')
var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(common, {
  entry: [
    path.resolve(__dirname, 'src', 'index.js')
  ],
  output: {
    libraryTarget: 'umd',
    library: 'zieditor',
  },
  module: {
    rules: [{
      test: /\.(css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',//css-loader 是处理css文件中的url(),require()等
          options: {
            sourceMap: true,
          }
        },],
      })
    }]
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: 'zieditor.min.css',
    }),
  ]
})