const fs = require('fs')
const path = require('path')

// 一个简单的内存文件系统。将数据保存在JavaScript对象中。用来保存开发环境下 webpack 在内存中生成的代码
const MFS = require('memory-fs')
const webpack = require('webpack')

// 像 webpack / grunt /gulp 等工具都提供watch模式，当磁盘文件变化后自动重新运行打包。今天我们要学习的chokidar就是一款专门用于文件监控的库
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

/**
 * app = express()
 * templatePath = resolve('./src/index.template.html')
 */
module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(res => { ready = res })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // read template from disk and watch
  // 监听模板 index 文件
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // --------------------------- webpack 中间件 ---------------------------------------
  // 文档：https://github.com/webpack-contrib/webpack-hot-middleware#installation--usage
  // modify client config to work with hot middleware

  // 把 clientConfig.entry.app 打包到路径 webpack-hot-middleware/client.js
  // 服务器可以在捆绑包重建时接收通知，然后相应地更新客户端 bunlde
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.output.filename = '[name].js'
  // webpack 热加载所需插件
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

// Compiler 实例
// 如果你不向 webpack 执行函数传入回调函数，就会得到一个 webpack Compiler 实例
// 你可以通过它手动触发 webpack 执行器，或者是让它执行构建并监听变更
// https://webpack.docschina.org/api/node/#compiler-%E5%AE%9E%E4%BE%8B-compiler-instance-
  const clientCompiler = webpack(clientConfig)

  // dev middleware
  // 中间件构建
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  
  app.use(devMiddleware)
  // ---------------------------------------------------------------------------------

  // 在client webpack结合vue-ssr-webpack-plugin完成编译后，获取devMiddleware的fileSystem
  // 读取内存中的bundle 并通过传入的回调更新server.js中的bundle
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    // todo 待验证
    // 同步读取打包后的文件
    // readFile 完整路径为
    // path.resolve(__dirname, '../dist') + 'vue-ssr-client-manifest.json'
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  // hot middleware
  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}
