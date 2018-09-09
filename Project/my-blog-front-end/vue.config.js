const fs = require('fs')

function getMockJson(req, res, method) {
    res.setHeader('Content-Type', 'application/json;charset=UTF-8')
    const originalUrl = req.originalUrl
        .split('/')
        [req.originalUrl.split('/').length - 1].split('?')[0]
    res.status(200).send(
        fs
            .readFileSync(`./src/api/mock/${method}/${originalUrl}.json`)
            .toString('UTF-8')
    )
}

module.exports = {
    devServer: {
        proxy: {
            '/localMock': {
                //将www.exaple.com印射为/apis
                target: 'http://localhost:8088', // 接口域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/localMock': '' //需要rewrite的,
                }
            }
        },
        // 开发环境下，可以使用本地接口
        before: (app) => {
            app.get('/mock/*', (req, res) => {
                getMockJson(req, res, 'GET')
            })
            app.post('/mock/*', (req, res) => {
                getMockJson(req, res, 'POST')
            })
            app.put('/mock/*', (req, res) => {
                getMockJson(req, res, 'PUT')
            })
            app.delete('/mock/*', (req, res) => {
                getMockJson(req, res, 'DELETE')
            })
        }
    }
}
