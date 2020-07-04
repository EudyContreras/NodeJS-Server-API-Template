/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const tsLoader = require('../loaders/loader.ts');

const enviroment = process.env.NODE_ENV;
const precompile = process.env.PRECOMPILE == 'true';

const publicPath = '../../build/public/';
const isProduction = enviroment === 'production';
const sourceLocation = precompile ? 'dist' : 'src';
const entryPoint = `./${sourceLocation}/workers/service-worker.${precompile ? 'js' : 'ts'}`;

const babelLoader = { test: /\.(jsx|tsx|ts|js)$/, exclude: /(node_modules)/, use: 'babel-loader' };

module.exports = {
	name: 'worker',
	target: 'webworker',
	mode: enviroment,
	bail: isProduction,
	entry: entryPoint,
	performance: {
		hints: false
	},
	plugins: [],
	output: {
		path: path.join(__dirname, publicPath),
		futureEmitAssets: isProduction,
		pathinfo: false,
		filename: 'service-worker.js',
		publicPath: publicPath,
		globalObject: 'self'
	},
	module: {
		rules: [ isProduction ? babelLoader : tsLoader, 
			{
				test: /\.txt$/,
				use: 'raw-loader'
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};