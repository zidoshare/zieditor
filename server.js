const express = require('express') // express开发服务器
var http = require('http') //http模块

const morgan = require('morgan') //请求记录器中间件

const app = express() 
app.use(morgan('short')) 


// Step 1: Create & configure a webpack compiler
const webpack = require('webpack')
var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.dev')
var compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, //取消webpack编译输出，如果需要可以注释掉
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log, //输出 定位到 console.log
  path: '/__webpack_hmr',  
  heartbeat: 2000
}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'src/index.html')
})

if (require.main === module) {
  var server = http.createServer(app)
  server.listen(process.env.PORT || 3002, function() {
    console.log('Listening on %j', server.address())
  })
}