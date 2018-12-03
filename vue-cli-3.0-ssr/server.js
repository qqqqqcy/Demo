const fs = require('fs')
const path = require('path')
const express = require('express')

// 获取绝对路径
const resolve = file => path.resolve(__dirname, file)

const {
  createBundleRenderer
} = require('vue-server-renderer')

// 判断是否生成环境
const isProd = process.env.NODE_ENV === 'production'

// 判断是否缓存
const useMicroCache = process.env.MICRO_CACHE !== 'false'

// 服务端信息
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

function createRenderer(bundle, options) {
  // https://ssr.vuejs.org/zh/guide/bundle-renderer.html#%E4%BD%BF%E7%94%A8%E5%9F%BA%E6%9C%AC-ssr-%E7%9A%84%E9%97%AE%E9%A2%98
  // 使用 createBundleRenderer 可以让服务端也热更新，不用重启服务
  return createBundleRenderer(bundle, Object.assign(options, {
    // 只有在所生成的 bundle 文件与外部的 NPM 依赖模块放置在不同位置
    // 或者 vue-server-renderer 是通过 NPM link 链接到当前项目中时，才需要配置此选项。
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('./src/index.template.html')
if (isProd) {

  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

// express.static 是 Express 内置的唯一一个中间件
// 是基于 serve-static 开发的，负责托管 Express 应用内的静态资源
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})


app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))


function render(req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8089
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})