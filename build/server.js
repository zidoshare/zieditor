var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.config')
var proxyMiddleware = require('http-proxy-middleware')

var port = process.env.PORT || 9001
var autoOpenBrowser = true
