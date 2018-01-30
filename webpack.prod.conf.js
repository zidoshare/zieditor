'use strict'

var merge = require('webpack-merge')
var common = require('./webpack.common.js')
var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common,{
  entry:[
    path.resolve(__dirname,'src','index.js')
  ],
  devtool:'source-map',
  plugins:[
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin(),
  ]
})