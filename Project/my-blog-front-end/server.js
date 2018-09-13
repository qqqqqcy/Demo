const fs = require('fs')
const path = require('path')
const Vue = require('vue')
const express = require('express')
const app = express()

const resolve = (file) => path.resolve(__dirname, file)
app.use(express.static('./dist'))

const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(resolve('./src/index.temp.html'), 'utf-8'),
    clientManifest: clientManifest
})

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html)
        })
    })
}

// 第 3 步：添加一个中间件来处理所有请求
app.use((req, res) => {
    const context = {
        title: 'ssr test',
        url: req.url
    }
    // 将 context 数据渲染为 HTML
    renderToString(context)
        .then((html) => res.send(html))
        .catch((err) => res.status(500).send(err))
})

const port = 3000
app.listen(port, function() {
    console.log(`server started at localhost:${port}`)
})
