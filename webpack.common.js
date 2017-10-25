/**
 * webpack 基础配置文件
 * @authors zido (wuhongxu1208@gmail.com)
 * @date    2017-10-16 23:16:00
 * @link <a href="https://zido.site/">zido的个人博客</a>
 *
 */

'use strict'

const path = require('path')
const config = require('./config')
module.exports = {
  output: {
    filename: '[name].[hash].js',
    path: config.dist,
    publicPath:''
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    //webpack1.0中可以省略 '-loader'，但是官方说法为了有明确的区分，在webpack2.0中，不能再省略
    rules: [{
        test: /\.(js)$/,
        loader: 'babel-loader',
        include: [
          config.srcPath, //转换src路径下的代码
        ],
        exclude: /node_modules/, //忽略node_modules路径代码
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },{
        test:/\.json$/,
        use:[
          'json-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.json'
    ],
  }
}
