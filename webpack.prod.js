/**
 * webpack 生产环境配置文件
 * @authors zido (wuhongxu1208@gmail.com)
 * @date    2017-10-16 23:16:00
 * @link <a href="https://zido.site/">zido的个人博客</a>
 *
 */
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const config = require('./config')
const webpack = require('webpack')
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common,{
  entry: [
    path.join(config.srcPath, 'index.js'),
  ],
  plugins : [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: config.indexHtml,
      inject: 'body',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  devtool: 'cheap-module-source-map',
})