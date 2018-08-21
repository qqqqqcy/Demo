'use strict'
console.log('webpack.dev.conf.js')

// 方法：utils（工具类）
const utils = require('./utils')

// 插件： webpack
const webpack = require('webpack')

// 值：config 里包含了 dev 和 production 环境的一些基本配置
const config = require('../config')

// 插件：webpack-merge （webpack 合并）
// 这个模块用于把多个 webpack 配置合并成一个配置，后面的配置会覆盖前面的配置
const merge = require('webpack-merge')

// 插件：Node.js 提供的,用于处理文件路径的小工具
const path = require('path')

// 值： baseWebpackConfig（基础 webpack 配置）
// 这个设置文件包含了开发环境和生产环境的一些公共配置
const baseWebpackConfig = require('./webpack.base.conf')

// 插件：用来复制文件和文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 插件：自动生成 html 并且注入打包后的 js
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 插件：用来显示更友好，清晰的 webpack 运行错误和警告等信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 插件：查找一个未使用的端口
const portfinder = require('portfinder')

// 变量：获取 host 环境变量，用于配置开发环境域名
const HOST = process.env.HOST

// 变量：获取 post 环境变量，用于配置开发环境时候的端口号
const PORT = process.env.PORT && Number(process.env.PORT)

// 开发环境的完整的配置文件
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 为那些独立的css类型文件添加loader配置（没有写在vue文件的style标签中的样式）
    // rules: utils.styleLoaders({
    //   sourceMap: config.dev.cssSourceMap,
    //   usePostCSS: true
    // })
  },

  // 此选项控制是否生成，以及如何生成 source map
  // 简单的 sourceMap 模式对于开发来说更快速
  devtool: config.dev.devtool,

  // devServer 选项应该在 config/index.js 中被定制
  devServer: {
    //--inline  应用程序启用内联模式(inline mode)。
    // 这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
    // (--inline = false 关闭这种模式 那么将不会出现修改代码后实时刷新)
    clientLogLevel: 'warning',

    // History API 当遇到 404 响应时会被替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },

    // 启用 webpack 的模块热替换特性：
    hot: true,
    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
    contentBase: false,
    // 一切服务都启用gzip 压缩：
    compress: true,
    // 指定使用一个 host。默认是 localhost
    host: HOST || config.dev.host,
    // 指定 port
    port: PORT || config.dev.port,
    // 是否自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 当编译出现错误的时候，是否希望在浏览器中展示一个全屏的蒙层来展示错误信息
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 指定 webpack-dev-server 的根目录，这个目录下的所有的文件都是能直接通过浏览器访问的
    // 推荐和 output.publicPath 设置为一致
    publicPath: config.dev.assetsPublicPath,

    // 配置代理，这样我们就可以跨域访问某些接口
    // 我们访问的接口，如果符合这个选项的配置，就会通过代理服务器转发我们的请求
    proxy: config.dev.proxyTable,

    // 除了初始启动信息之外的任何内容都不会被打印到控制台
    // necessary for FriendlyErrorsPlugin
    quiet: true,

    // 与监视文件相关的控制选项。
    // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。
    // 例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询：
    watchOptions: {
      poll: config.dev.poll,
    }
  },

  plugins: [
    //  允许在业务代码中使用的全局变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 启用热替换模块
    new webpack.HotModuleReplacementPlugin(),

    // 这个插件的主要作用就是在热加载的时候直接返回更新文件的名称，而不是文件的id
    new webpack.NamedModulesPlugin(),

    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new webpack.NoEmitOnErrorsPlugin(),

    // 该插件将为你生成一个HTML5文件，自动把webpack打包出的js 和 css 注入进去
    new HtmlWebpackPlugin({
      // 生成 html 的名称
      filename: 'index.html',
      // 模板 html
      template: 'index.html',
      // js 插入到body最后
      inject: true
    }),
    // copy custom static assets
    // 拷贝静态资源到build文件夹中
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})


module.exports = new Promise((resolve, reject) => {
  // 优先等于进程端口
  portfinder.basePort = process.env.PORT || config.dev.port
  // 使用插件去判断当前端口是否可用
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      // 让设置好的端口等于可用的端口
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      // 将 FriendlyErrorsPlugin 添加到 webpack 的配置文件中
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        // 编译成功时候的输出信息
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        // 编译失败时候的输出信息
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      // resolve 配置文件
      resolve(devWebpackConfig)
    }
  })
})
