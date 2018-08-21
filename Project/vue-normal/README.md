# vue-normal

## 配置过程

1. 调整目录结构
2. 安装 `less` 相关
3. 安装 `axios`，设置为全局变量 `$_axios`
4. 修改 `build/webpack.dev.conf.js` ，增加开发环境下，本地 mock 的功能
5. 修改 `config/index.js` ，增加开发环境下，本地代理的功能
6. 添加 `filter`
7. 添加 `vuex`

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
 