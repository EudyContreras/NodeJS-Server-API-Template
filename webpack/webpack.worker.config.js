/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const CleanPlugin = require('webpack-clean');
const NodeExternals = require('webpack-node-externals');
const optimization = require('./sections/optimization');
const babelLoader = require('./loaders/babel.loader');

const enviroment = process.env.NODE_ENV;
const publicPath = '../build/public/';

const isProduction = enviroment == 'production';
const isDevelopement = enviroment == 'development';

module.exports = {
	name: 'client',
	target: 'web',
	mode: enviroment,
	bail: isProduction,
	entry: './workers/service-worker.js',
	performance: {
		hints: false
	},
	plugins: [
		new CleanPlugin([
			'../workers/service-worker.js'
		])
	],
	output: {
		path: path.join(__dirname, publicPath),
		futureEmitAssets: isProduction,
		pathinfo: isDevelopement,
		filename: 'service-worker.js',
		publicPath: '/',
		globalObject: 'this'
	},
	externals: [NodeExternals()],
	optimization: optimization({ enviroment: enviroment, production: isProduction }),
	module: {
		rules: [babelLoader]
	},
	resolve: {
		extensions: ['*', '.js']
	}
};