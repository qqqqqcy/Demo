'use strict'

// 检查 node 和 npm 是否满足版本要求
require('./check-versions')()

// 导入设置
const config = require('../config')
// 判断当前所运行的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 用来在服务启动后自动打开浏览器
const opn = require('opn')

// node 自带的路径插件
const path = require('path')

// express 用作开发模式下的后台
const express = require('express')

const webpack = require('webpack')

// 用于把请求代理转发到其他服务器的中间件
// https://github.com/chimurai/http-proxy-middleware
const proxyMiddleware = require('http-proxy-middleware')

// 根据 开发/生产 引入对应的 webpack 配置
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for idev-serverncoming traffic
// 端口号，取进程端口号或者设置好的
const port = process.env.PORT || config.dev.port

// automatically open browser, if not set will be false
// 自动打开浏览器，默认是 true 
const autoOpenBrowser = !!config.dev.autoOpenBrowser

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 设置服务器的代理规则
const proxyTable = config.dev.proxyTable

const app = express()

// Compiler 实例
// 如果你不向 webpack 执行函数传入回调函数，就会得到一个 webpack Compiler 实例
// 你可以通过它手动触发 webpack 执行器，或者是让它执行构建并监听变更
// https://webpack.docschina.org/api/node/#compiler-%E5%AE%9E%E4%BE%8B-compiler-instance-
const compiler = webpack(webpackConfig)

// webpack-dev-middleware 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。
// https://github.com/webpack/webpack-dev-middleware
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 配合 webpack-dev-middleware 使用
// 在不使用 webpack-dev-server 的情况下，将热重新加载添加到现有服务器中
// https://github.com/webpack-contrib/webpack-hot-middleware
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')

// waitUntilValid(callback)
// 当编译器包有效时，通常在编译之后执行回调函数。
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

// 此处导出是作为测试时用的
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
