'use strict'
console.log('check-versions.js')
/* chalk插件：在控制台中输出不同的颜色的字 */
const chalk = require('chalk')

/* *
* semver插件：是用来对特定的版本号做判断的，比如
* semver.gt('1.2.3','9.8.7') false 1.2.3版本比9.8.7版本低
* semver.satisfies('1.2.3','1.x || >=2.5.0 || 5.0.0 - 7.2.3') true 1.2.3的版本符合后面的规则
* */
const semver = require('semver')

/* 下面是导入package.json文件,要使用里面的engines选项，要注意require是直接可以导入json文件的，并且requrie返回的就是json对象*/
const packageConfig = require('../package.json')

/* shelljs插件：作用是用来执行Unix系统命令 */
const shell = require('shelljs')

/* exec:获取版本号 */
function exec (cmd) {
  /* *
  * require('child_process'):创建一个子进程
  * execSync:同步
  * */
  return require('child_process').execSync(cmd).toString().trim()
}

/* versionRequirements:一个用来记录 node,npm 版本的数组 */
const versionRequirements = [
  {
    /*
    * name:名称
    * currentVersion:当前环境版本 使用semver插件吧版本信息转化成规定格式
    * versionRequirement:正常运行要求的版本
    * */
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

/* which 指令会在环境变量 $PATH 设置的目录里查找符合条件的文件 */
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

/* 导出模块 */
module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    /* 如果版本过低，在 warnings 数组添加警告 */
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  /* 只要有一项版本不符合,输出警告 */
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    /* 结束进程 */
    process.exit(1)
  }
}
