/**
 * webpack 开发环境配置文件
 * @authors zido (wuhongxu1208@gmail.com)
 * @date    2017-10-16 23:16:00
 * @link <a href="https://zido.site/">zido的个人博客</a>
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const config = require('./config')
const webpack = require('webpack')
module.exports = merge(common,{
  entry: [
    path.join(config.srcPath, 'index.js'),
  ],
  plugins : [
    new HtmlWebpackPlugin({
      template: config.indexHtml,
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR全局启用
    new webpack.NamedModulesPlugin(), // 在HMR更新的浏览器控制台中打印更易读的模块名称
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devtool:'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clientLogLevel: 'none', //日志
    compress: true, //压缩
    port: 3002,
    stats: {
      colors: true
    },
    disableHostCheck: true,
    open: true,
  }
})