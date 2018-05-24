var path = require('path')
var webpack = require('webpack')
var config = require('../config.js')


var rootDir = path.join(__dirname, '..')
function dir(str) {
  return path.resolve(rootDir, str)
}

exports.dir = dir

module.exports = {
  entry: {
    app: './src/',
  },
  node: {
    fs: 'empty',
  },
  output: {
    path: dir('dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': dir('src'),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [
        dir('src'),
        dir('test'),
      ],
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [dir('src'), dir('test')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]',
      },
    }, {
      test: /\.(ttf|eot|otf|woff2?)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[hash:7].[ext]',
      },
    }, {
      test: /\.(md|yml|html)$/,
      loader: 'raw-loader'
    }],
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require('../package.json').version)
      })
    ]
  }
}