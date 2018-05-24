var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackCleanPlugin = require('clean-webpack-plugin')

var webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true,
    })
  },
  mode: 'production',
  devtool: '#source-map',
  output: {
    path: baseConfig.dir('dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process
          .env
          .NODE_ENV
          .trim())
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      filename: baseConfig.dir('dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpackCleanPlugin(['./dist/*'], {
      root: __dirname,
      dry: false,
      verbose: true,
    }),
  ]
})