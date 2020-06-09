/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const NodeExternals = require('webpack-node-externals');
const optimization = require('../sections/optimization');
const urlLoader = require('../loaders/url.loader');

const enviroment = process.env.NODE_ENV;
const precompile = process.env.PRECOMPILE == 'true';

const publicPath = '../../build/public/';
const isProduction = enviroment === 'production';
const sourceLocation = precompile ? 'pre' : 'src';
const entryPoint = `./${sourceLocation}/workers/service-worker.${precompile ? 'js' : 'ts'}`;

module.exports = {
	name: 'worker',
	target: 'web',
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
		pathinfo: !isProduction,
		filename: 'service-worker.js',
		publicPath: publicPath,
		globalObject: 'this'
	},
	externals: [NodeExternals()],
	optimization: optimization({
		splitChunk: null,
		production: isProduction
	}),
	module: {
		rules: [{
			test: /\.(ts|js)$/,
			exclude: /(node_modules)/,
			use: 'babel-loader'
		}, {
			test: /\.txt$/,
			use: 'raw-loader'
		},
		urlLoader
		]
	},
	resolve: {
		extensions: ['*', '.js', '.ts']
	}
};