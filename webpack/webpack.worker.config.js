/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const NodeExternals = require('webpack-node-externals');
const optimization = require('./sections/optimization');
const babelLoader = require('./loaders/babel.loader');

const enviroment = process.env.NODE_ENV;
const publicPath = '../build/public/';
const entryPoint = './pre/workers/service-worker.js';

const isProduction = enviroment == 'production';

module.exports = {
	name: 'client',
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
		publicPath: '/',
		globalObject: 'this'
	},
	externals: [NodeExternals()],
	optimization: optimization({ enviroment: enviroment, useSourceMap: !isProduction, production: isProduction }),
	module: {
		rules: [babelLoader]
	},
	resolve: {
		extensions: ['*', '.js']
	}
};