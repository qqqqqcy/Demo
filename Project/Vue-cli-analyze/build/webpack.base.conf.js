/* 这里的文件是公用的一些基础配置项 */
'use strict'
console.log('webpack.base.conf.js')

// 插件：Node.js 提供的,用于处理文件路径的小工具
const path = require('path')

// 方法：urils（工具类）
const utils = require('./utils')

// 值：config 里包含了 dev 和 build 环境的一些基本配置
const config = require('../config')

// 配置 vue-loader 的内容
const vueLoaderConfig = require('./vue-loader.conf')

// 方法：拼接 __dirname 和 dir
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {

  // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)
  // 默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory)
  context: path.resolve(__dirname, '../'),

  // 基础目录，绝对路径，用于从配置中解析入口起点
  entry: {
    app: './src/main.js'
  },

  // 输出
  output: {
    // 编译输出的静态资源根路径
    path: config.build.assetsRoot,
    /*
     * 此选项决定了每个输出 bundle 的名称。
     * [name]是指入口名称 [id]是指chunk id [hash]是指构建完的hash [chunkhash]是指每个内容的hash
     * */
    filename: '[name].js',
    // 正式发布环境下编译输出的上线路径的根路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

  // 选项能设置模块如何被解析
  resolve: {
    // import 文件时候可以省略后缀
    extensions: ['.js', '.vue', '.json'],
    // import 文件时候，路径中包含下面的 key 会被自动解析为 value
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },

  // 配置不同类型模块的处理规则
  module: {
    rules: [
      // 所有的 .vue 文件使用 vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // src 和 test 下的 .js 文件使用 babel-loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      // 所有的图片文件使用 url-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // 所有的音频文件使用 url-loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      // 所有的字体文件使用 url-loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  /* *
   * 这些选项用于配置polyfill或mock某些node.js全局变量和模块。
   * 这可以使最初为nodejs编写的代码可以在浏览器端运行
   * 这个配置是一个对象，其中的每个属性都是nodejs全局变量或模块的名称
   *  false表示什么都不提供。如果获取此对象的代码，可能会因为获取不到此对象而触发ReferenceError错误
   *  设置成empty则表示提供一个空对象
   * */
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
