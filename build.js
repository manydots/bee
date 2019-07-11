'use strict';

let fs = require('fs-extra');
let globby = require('globby');
let path = require('path');
var colors = require('colors');

//STEP 3 将lib copy 到 build 目录 webpack不编译打包 以下package依赖  webpack.config.js[externals] 未使用
//old版本资源路径
//'node_modules/react/dist/*',
//'node_modules/react-dom/dist/*'
globby([
	'node_modules/babel-polyfill/dist/*',
	'node_modules/react/cjs/react.production.min.js',
	'node_modules/react-dom/cjs/react-dom.production.min.js*',
	'node_modules/react-redux/dist/*',
	'node_modules/react-router/umd/*',
	'node_modules/react-router-redux/dist/*',
	'node_modules/redux-thunk/dist/*',
	'node_modules/redux/dist/*'
]).then(paths => {
	fs.mkdirsSync('build/lib/');
	paths.forEach((item) => {
		let filename = path.basename(item);
		fs.copySync(item, 'build/lib/' + filename);
	});
});

//使用统计
console.log('[ build-copy ] copy files to build/lib done.'.magenta);