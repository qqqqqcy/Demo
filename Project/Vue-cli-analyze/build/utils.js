'use strict'
console.log('utils.js')
/* *
 * utils = 工具类，辅助类，同一类的静态方法
 * */

// 插件：Node.js 提供的,用于处理文件路径的小工具
const path = require('path')

// 值：config 里包含了 dev 和 build 环境的一些基本配置
const config = require('../config')

// 插件：把 css 样式从打包的 js 中提取出来
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 值：package.json 里包含了项目的基本信息，此处引入为了使用其中的 engines 信息
const packageConfig = require('../package.json')

// 方法：求 _path 的绝对路径
exports.assetsPath = function (_path) {

  // 根据条件判断拼接 build | dev 路径
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // path.join([...paths]) 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
  // @example  path.join('d','c','main.js') => d\c\main.js
  // posix 兼容 win 和 posix 标准
  return path.posix.join(assetsSubDirectory, _path)
}

// 导出 cssLoaders 的相关配置
exports.cssLoaders = function (options) {

  // options 如果不为 null、undefined、0、""等，就维持原样，否则赋值为 {}
  // 在 js 中 || 运算符，A || B，A如果为真，直接返回A。如果为假，直接返回B（不会判断B是什么类型）
  options = options || {}

// css-Loader 的基本设置
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否使用 sourceMap
      sourceMap: options.sourceMap
    }
  }

// post-css 的基本设置
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 用来生成一个样式loader的数组
  // generate loader string to be used with extract text plugin
  // 创建loader加载器字符串，结合extract text插件使用
  /**
   * @param {loader的名称} loader
   * @param {loader对应的options配置对象} loaderOptions
   */
  function generateLoaders(loader, loaderOptions) {

    // 判断是否使用了postLoader ，如果使用了，需要添加 postcssLoader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    // 如果指定了具体的loader的名称
    if (loader) {
      // 向loaders的数组中添加该loader对应的加载器 ( 结构类似上面的 cssLoader 和 postcssLoader )
      // 一个很重要的地方就是，一个数组中的loader加载器，是从右向左执行的。
      loaders.push({
        // loader加载器的名称
        loader: loader + '-loader',
        // 对应的加载器的配置对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 如果明确指定了需要提取css文件，则使用
    // ExtractTextPlugin.extract({})来包裹我们的各种css处理器。
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        // fallback这个选项我们可以这样理解
        // webpack默认会按照loaders中的加载器从右向左调用编译各种css类型文件。如果一切顺利，在loaders中的
        // 各个加载器运行结束之后就会把css文件导入到规定的文件中去，如果不顺利，则继续使用vue-style-loader来处理
        // css文件
        fallback: 'vue-style-loader'
      })
    } else {
      // 如果没有提取行为，则最后再使用vue-style-loader处理css
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 使用这个函数，为那些独立的style文件创建加载器配置。
//exports = module.exports = {};
exports.styleLoaders = function (options) {
  // 保存加载器配置的变量
  const output = []
  // 获取所有css文件类型的loaders
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    // 生成对应的loader配置
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.createNotifierCallback = () => {
  // node-notifier是一个跨平台的包，以类似浏览器的通知的形式展示信息。
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return
    // 只展示错误的信息
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    // 需要展示的错误信息的内容
    notifier.notify({
      // 通知的标题
      title: packageConfig.name,
      // 通知的主体内容
      message: severity + ': ' + error.name,
      // 副标题
      subtitle: filename || '',
      // 通知展示的icon
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
