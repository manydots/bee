var webpack = require('webpack');
const path = require('path');

module.exports = {
	mode: 'development', //development  production 
	//context: cwd,
	entry: './main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		chunkFilename: '[chunkhash].js'
	},
	devServer: {
		contentBase: "./",
		host: '127.0.0.1',
		port: 8080,
		inline: true,
		compress: false
	},
	module: {
		rules: [{
			test: /\.(jsx|js)?$/,
			use: [{
				loader: 'babel-loader'
			}]
		}]
	}

};