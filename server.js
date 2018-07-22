var config = require('./config/webpack.dev.config')

const Koa = require('koa')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const koa2Connect = require('koa2-connect')

const compile = webpack(config)
const expressDevMidduleware = devMiddleware(compile, {
  publicPath: config.output.publicPath || '/'
})
const expressHotMiddleware = hotMiddleware(compile)
console.log('> Starting dev server...')
const app = new Koa()

app.use(koa2Connect(expressDevMidduleware))
app.use(koa2Connect(expressHotMiddleware))

app.listen(3000)

console.log('> listening at localhost:3000\n')