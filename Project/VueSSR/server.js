// const createApp = require('./app')
const createApp = require('./entry-server.bounld')
console.log(createApp.context)
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const header = {
    title: 'hello',
    meta: `
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum=1.0,user-scalable=no">
    <meta name="format-detection" content="telephone=no, email=no">
    `
}

server.get('*', (req, res) => {
    const app = createApp()

    renderer.renderToString(app, header, (err, html) => {
        if (err) {
            res.status(500).end(err)
            return
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html)
    })
})

const adr = server.listen(8084, () => {
    let host = adr.address().address;
    let port = adr.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})