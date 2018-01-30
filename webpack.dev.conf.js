'use strict'

const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common,{
  entry:[
    path.resolve(__dirname,'test','index.js')
  ],
  devtool:'inline-source-map',
  devServer:{
    contentBase:'./dist',
    port:9000,
    hot:true,
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'zieditor test',
      template:path.resolve(__dirname,'test','templates','index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})