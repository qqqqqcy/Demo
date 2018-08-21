'use strict'
console.log('build.js')
/*  node,npm 版本检查  */
require('./check-versions')()

/*
* 设置环境变量为production
* process.env 是node环境内置的变量，在命令行里可以通过 set 变量名=值的方式来设置，等价于 set NODE_ENV='production'
* */
process.env.NODE_ENV = 'production'

/* ora插件:是一个命令行转圈圈动画插件，好看用的 */
const ora = require('ora')

/* rimraf插件:用来执行UNIX命令rm和-rf的用来删除文件夹和文件，清空旧的文件 */
const rm = require('rimraf')

/* path插件:Node.js 提供的,用于处理文件路径的小工具 */
const path = require('path')

/* chalk插件:在控制台中输出不同的颜色的字 */
const chalk = require('chalk')

/* Webpack:打包用的插件 */
const webpack = require('webpack')

/* 项目配置文件 */
const config = require('../config')

/* 生产环境的 Webpack 配置文件 */
const webpackConfig = require('./webpack.prod.conf')

/* 开启加载动画 */
const spinner = ora('building for production...')
spinner.start()

/* 调用 rm 方法,第一个参数和第二个参数分别是 ../dist 和 static，表示删除路径下面的所有文件 */
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  /* 如果过程中出现错误,抛出错误,终止程序 */
  if (err) throw err
  /* 调用webPack执行构建 */
  webpack(webpackConfig, (err, stats) => {
    /* 这个回调函数是webpack编译过程中执行 */

    /* 加载动画停止 */
    spinner.stop()

    /* 如果过程中出现错误,抛出错误,终止程序 */
    if (err) throw err

    /*
    * stdout = standout 标准输出
    * process.stdout.write:向屏幕输出
    * stats:编译过程中的各种消息
    * */
    process.stdout.write(stats.toString({
      colors: true, //增加控制台颜色开关
      modules: false, // 不增加内置模块信息
      children: false, // 不增加子级信息 If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false, // 允许较少的输出
      chunkModules: false // 不将内置模块的信息加到包信息
    }) + '\n\n')

    /* 如果报错,输出失败 */
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
