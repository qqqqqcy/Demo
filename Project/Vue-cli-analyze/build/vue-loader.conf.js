'use strict'
console.log('vue-loader.conf.js')

// 方法：utils（工具类）
const utils = require('./utils')

// 值：config 里包含了 dev 和 production 环境的一些基本配置
const config = require('../config')

// 值：判断目前处于什么环境
const isProduction = process.env.NODE_ENV === 'production'

// 值：根据环境不同使用不同的 SourceMap 设置
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  // .vue 文件中的 cssLoader 配置
  loaders: utils.cssLoaders({
    // 选择 sourceMap
    sourceMap: sourceMapEnabled,
    // 如果是生成环境就额外打包 css
    extract: isProduction
  }),

  // css source map文件的配置
  cssSourceMap: sourceMapEnabled,

  // css source map文件缓存控制变量
  cacheBusting: config.dev.cacheBusting,

  // 把对应标签里的变量转化为图片资源
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
