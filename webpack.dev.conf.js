'use strict'

const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common,{
  entry:[
    path.resolve(__dirname,'server','index.js')
  ],
  devtool:'inline-source-map',
  devServer:{
    contentBase:'./dist',
    port:9000,
    hot:true,
    open:true,
  },
  module:{
    rules:[{
      test:/.css$/,
      use:['style-loader','css-loader']
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'zieditor test',
      template:path.resolve(__dirname,'test','templates','index.html'),
      favicon:path.resolve(__dirname,'test','templates','z.png')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
})