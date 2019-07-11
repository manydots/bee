var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var globby = require('globby');
var cwd = process.cwd();
var webpack = require('webpack');
var path = require('path');
var colors = require('colors');

console.log(`[ mode_env ] ${process.env.NODE_ENV}`.green); // outputs green text 


var entry = {
	vendor: ['react', 'react-dom'],
	vendorCommon: ['jquery']
};

var files = globby.sync(['**/pages/*'], {
	//读取根目录/src下的文件夹
	cwd: cwd + '/src'
});
//console.log('files:----->', files)
files.forEach((item) => {
	entry[item + '/main'] = ['./src/' + item + '/main.js'];
});


// var entrys = {
// 	'pages/course1/main': ['./src/pages/course1/main.js'],
// 	'pages/course2/main': ['./src/pages/course2/main.js']
// };
//entrys 第一部分对应index.html 引入js路径

//console.log('entry:----->', entry)
module.exports = {

	context: cwd,
	entry: entry, //./main.js
	output: {
		path: path.resolve(__dirname, 'build'), //输出文件的绝对路径
		filename: '[name].js',
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
		port: 8088,
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
	// externals: {
	// 	'react': 'React',
	// 	'react-dom': 'ReactDOM',
	// 	'jquery': 'jQuery'
	// },
	plugins: [

		new webpack.BannerPlugin('test'),
		new ExtractTextPlugin({
			filename: '[name].build.css',
			disable: false,
			allChunks: true
		}),
		//分离资源库
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendorCommon', 'vendor'],
			filename: '[name].min.js',
			minChunks: Infinity
		})
	]

};

if (process.env.NODE_ENV === 'production') {

	var build = require('./build.js');
	//生产环境打包压缩
	module.exports.plugins.push(new CleanWebpackPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				unused: true,
				dead_code: true,
				warnings: false,
				drop_debugger: true,
				drop_console: true
			},
			mangle: {
				except: ['$', 'exports', 'require']
			},
			output: {
				comments: false,
				ascii_only: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(true));
		console.log('[ webpack ] successful Packaging Compilation.'.green); 

}else{
	console.log('[ webpack ] successful local file construction.'.green); 
}