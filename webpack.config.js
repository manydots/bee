var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {

	//context: cwd,
	entry: './main.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			components: path.join(__dirname, 'src/components'),
			utils: path.join(__dirname, 'src/utils'),
			sources: path.join(__dirname, 'src/sources'),
			styles: path.join(__dirname, 'src/styles'),
			pages: path.join(__dirname, 'src/pages'),
			imgurl: path.join(__dirname, 'src/images')
		}
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
			test: /\.(sa|c|sc)ss?$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader", "postcss-loader", "sass-loader"]
			}),
			include: [
				path.resolve(__dirname, "src")
			]
		}, {
			test: /\.(jsx|js)?$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			disable: false,
			allChunks: true
		})

	]

};