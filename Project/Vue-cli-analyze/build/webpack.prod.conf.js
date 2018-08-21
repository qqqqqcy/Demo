'use strict'
console.log('webpack.prod.conf.js')

// 插件：Node.js 提供的,用于处理文件路径的小工具
const path = require('path')

// 方法：utils（工具类）
const utils = require('./utils')

// 插件： webpack
const webpack = require('webpack')

// 值：config 里包含了 dev 和 production 环境的一些基本配置
const config = require('../config')

// 插件：webpack-merge （webpack 合并）
// 这个模块用于把多个 webpack 配置合并成一个配置，后面的配置会覆盖前面的配置
const merge = require('webpack-merge')

// 值： baseWebpackConfig（基础 webpack 配置）
// 这个设置文件包含了开发环境和生产环境的一些公共配置
const baseWebpackConfig = require('./webpack.base.conf')

// 插件：用来复制文件和文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 插件：自动生成 html 并且注入打包后的 js
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 插件：把 css 样式从打包的 js 中提取出来
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 插件：压缩提取出的 css 并解决 ExtractTextPlugin 分离出的重复问题
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 插件：压缩 js 代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 判断是 testing 还是 production
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    /* *
     * 在utils.js已经配置好相关对extractTextPlugin的css抽取配置.通过extract: true即可触发
     * 如果要触发这个 extract 需要在plugins里面注册一下
     * */
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },

  // 此选项控制是否生成，以及如何生成 source map
  devtool: config.build.productionSourceMap ? config.build.devtool : false,

  output: {
    // 打包路径
    path: config.build.assetsRoot,
    // build之后的文件的名称
    // 这里[name]和[chunkhash]都是占位符
    // 其中[name]指的就是模块的名称
    // [chunkhash]chunk内容的hash字符串，长度为20
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // [id]也是一个占位符，表示的是模块标识符(module identifier)
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // 压缩javascript的插件
    new UglifyJsPlugin({
      // 压缩js的时候的一些基本配置
      uglifyOptions: {
        compress: {
          // / 在删除未使用的变量等时，显示警告信息，默认就是false
          warnings: false
        }
      },
      // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度）
      // 而且这里不能使用cheap-source-map
      sourceMap: config.build.productionSourceMap,
      // 使用多进程并行运行和文件缓存来提高构建速度
      parallel: true
    }),

    // 提取css文件到一个独立的文件中去
    // extract css into its own file
    new ExtractTextPlugin({
      // 提取之后css文件存放的地方
      // 其中[name]和[contenthash]都是占位符
      // [name]就是指模块的名称
      // [contenthash]根据提取文件的内容生成的 hash
      filename: utils.assetsPath('css/[name].[contenthash].css'),

      // 当使用CommonsChunkPlugin并且公共块中有ExtractTextPlugin.extract块时，allChunks必须设置为true
      allChunks: true,
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 使用这个插件，压缩提取出来的CSS，并且去重。
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        // safe：安全模式
        // map：源码映射
        ? {safe: true, map: {inline: false}}
        : {safe: true}
    }),

    // generate dist index.html with correct asset hash for caching.
    // 生成正确加载 hash 资源的 index.html 页面
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // 生成的文件名
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      // 模板 html
      template: 'index.html',
      // js 插入到body最
      inject: true,
      // 压缩生成的 html
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 控制生成的js插入位置的顺序(可以结合chunks进行选择)
      chunksSortMode: 'dependency'
    }),

    // keep module.id stable when vendor modules does not change
    // 根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),

    // enable scope hoisting
    /*
    * 过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。
    * 这些打包函数使你的 JavaScript 在浏览器中处理的更慢。
    * 相比之下，一些工具像 Closure Compiler 和 RollupJS
    * 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
    * */
    new webpack.optimize.ModuleConcatenationPlugin(),

    // split vendor js into its own file
    // 提取公共模块(将公共的import模块 提取到一个文件中.)
    // webpack每次build的时候都会生成一些运行时代码。当只有一个文件时，运行时代码直接塞到这个文件中。
    // 当有多个文件时，运行时代码会被提取到公共文件中，也就是楼主的vendor
    // 为了阻止这种情况，我们需要将运行环境提取到一个单独的manifest文件里。
    // 及时我们创建了另一个bundle，但从长远来看，这种消耗比单独放在一个vendor中获得的收益要大
    new webpack.optimize.CommonsChunkPlugin({
      // common chunk 的名称
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        // 当条件满足时候会被拆分
        return (
          // 如果模块是一个路径
          module.resource &&
          //  而且在路径中有 ".js"
          /\.js$/.test(module.resource) &&
          // 模块存在于 node_modules 中
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    /*
    * webpack 运行之后会生成一段前置代码，负责管理解析所有的bundle、vendor 文件
    * 如果把这段代码剥离出来，打包时候，未修改过的chunk生成的hash可以保持不变，可以充分利用缓存
    * 这一段代码就是 manifest，里面不包含任何chunk，仅包含 manifest
    * */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
      minChunks: Infinity
    }),

    /*
    * */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      // async 设为true时，commons chunk 将不会合并到自身，而是使用一个新的异步的commons chunk
      async: 'vendor-async',
      // 指定为true的时候，就代表source chunks是通过entry chunks（入口文件）进行code split出来的children chunks
      children: true,
      // 最少有3处引用
      minChunks: 3
    }),

    // 拷贝静态资源到build文件夹中
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  // 插件：压缩打包之后的文件
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  // 在 webpack 配置里新增压缩插件
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      // 目标资源名称，默认值是 "[path].gz[query]"。
      // [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径，[query] 会被替换成查询字符串
      asset: '[path].gz[query]',

      //  可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip
      algorithm: 'gzip',

      // 所有匹配该正则的资源都会被处理。默认值是全部资源。
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      // 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0
      threshold: 10240,
      // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  // 如果需要生成一分bundle报告，则需要使用下面的这个插件
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
