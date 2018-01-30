'use strict'

var path = require('path')

module.exports = {
  output: {
    filename: '[name].[hash:7].js',
    path:path.resolve(__dirname,'dist'),
  },
}