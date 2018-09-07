const fs = require('fs')

module.exports = {
	devServer: {
		// 开发环境下，可以使用本地接口
		before: (app) => {
			app.all('/mock/*', (req, res) => {
				res.setHeader('Content-Type', 'application/json;charset=UTF-8')
				const originalUrl = req.originalUrl
					.split('/')
					[req.originalUrl.split('/').length - 1].split('?')[0]
				res
					.status(200)
					.send(
						fs
							.readFileSync(`./src/api/mock/${originalUrl}.json`)
							.toString('UTF-8')
					)
			})
		}
	}
}
