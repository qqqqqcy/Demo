/*
* 项目配置文件
* */

'use strict'
console.log('config/index.js')

// 插件：Node.js 提供的,用于处理文件路径的小工具
const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',       //资源子目录 指 js、css、img 存放的目录，其路径相对于 index.html
    assetsPublicPath: '/',              //资源目录

    // 一个典型的反相代理配置
    // @example：根据如下设置 /appName/getData 请求，会被替换为 http://api.appName.com/getData
    proxyTable: {
      // 如果请求地址中存在 /appName
      '/appName': {
        target: 'http://api.appName.com', // 目标url地址
        changeOrigin: true, // 指示是否跨域
        pathRewrite: {
          '^/appName': '' // 重写路径，设置 '/appName' 为 ''
        },
      },
    },

    // Various Dev Server settings 开发服务 变量设置
    /**
     * 开发时候的访问域名。可以通过环境变量自己设置。
     * host: '0.0.0.0' 可以本机ip访问
     */
    host: 'localhost', // can be overwritten by process.env.HOST
    /* 端口号 */
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    /* 是否自动打开浏览器 */
    autoOpenBrowser: true,
    /* 在浏览器是否展示错误蒙层 */
    errorOverlay: true,
    /* 是否展示错误的通知 */
    notifyOnErrors: true,
    /**
     * 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。Watch 模式默认关闭。
     * watchOptions.poll
     * boolean number
     * 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
     * poll: 1000  每秒检查一次变动
     * 如果监听没生效，试试这个选项吧。Watch 在 NFS 和 VirtualBox 机器上不适用。
     */
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    /*
    * 选择一种 source map 来增强调试过程。 */
    // 不包含列信息，同时 loader 的 sourcemap 也被简化为只包含对应行的
    // 最终的 sourcemap 只有一份，它是 webpack 对 loader 生成的 sourcemap 进行简化，然后再次生成的
    devtool: 'cheap-module-eval-source-map',

    // 指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
    cacheBusting: true,
    // 关闭css的source map
    cssSourceMap: true
  },

  build: {
    // Template for index.html
    //  html文件的生成的地方
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    // 编译生成的文件的目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 编译生成的静态文件的目录
    assetsSubDirectory: 'static',
    // 编译发布的根目录，可配置为资源服务器域名或者cdn域名
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // 是否开启生产环境的gzip压缩
    productionGzip: false,

    // 开启gzip压缩的文件的后缀名称
    productionGzipExtensions: ['js', 'css'],

    // 如果这个选项是true的话，那么则会在build后，会在浏览器中生成一份bundler报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
