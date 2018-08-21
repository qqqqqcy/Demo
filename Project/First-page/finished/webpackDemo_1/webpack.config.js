

module.exports = {
	entry: './src',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		rules:[
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}
		]
	}
};