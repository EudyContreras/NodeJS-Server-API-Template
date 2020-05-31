/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const NodeExternals = require('webpack-node-externals');
const optimization = require('../sections/optimization');
const babelLoader = require('../loaders/babel.loader');
const fileLoader = require('../loaders/file.loader');
const urlLoader = require('../loaders/url.loader');
const enviroment = process.env.NODE_ENV;
const isProduction = enviroment === 'production';
const publicPath = '../../build/public/';
const entryPoint = './src/workers/service-worker.ts';

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
			test: /\.txt$/,
			use: 'raw-loader'
		},
		babelLoader,
		fileLoader,
		urlLoader
		]
	},
	resolve: {
		extensions: ['*', '.js', '.ts']
	}
};