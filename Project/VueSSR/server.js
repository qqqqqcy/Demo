const createApp = require('./app')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const header = {
    title: 'hello',
    meta: `
      <meta ...>
      <meta ...>
    `
}

server.get('*', (req, res) => {
    const context = {
        url: decodeURI(req.url)
    }
    const app = createApp(context)

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