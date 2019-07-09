var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var globby = require('globby');
var cwd = process.cwd();
var webpack = require('webpack');
var path = require('path');

var entry = {};

var files = globby.sync(['**/pages/*'], {
	cwd: cwd + '/src'
});
files.forEach((item) => {
	entry[item + '/index'] = ['./src/' + item + '/index.js'];
});

console.log(files)
module.exports = {

	context: cwd,
	entry: './main.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		chunkFilename: '[chunkhash].js'
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
			use: 'babel-loader',
			// use: {
			// 	loader: 'babel-loader',
			// 	options: {
			// 		presets: ['es2015', 'react']
			// 	}
			// }
		}]
	},
	plugins: [
		new webpack.BannerPlugin('test'),
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			disable: false,
			allChunks: true
		}),

	]

};
if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(new CleanWebpackPlugin(), new webpack.optimize.DedupePlugin(), new webpack.optimize.OccurenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin());
}