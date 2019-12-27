/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const NodeExternals = require('webpack-node-externals');
const CompressPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const optimization = require('./sections/optimization');
const babelLoader = require('./loaders/babel.loader');

const enviroment = process.env.NODE_ENV;
const publicPath = '../build/public/';

const isProduction = enviroment == 'production';
const isDevelopement = enviroment == 'development';

module.exports = {
	name: 'client',
	target: 'node',
	mode: enviroment,
	bail: isProduction,
	entry: [
		'@babel/polyfill', './workers/service-worker.js'
	],
	performance: {
		hints: false
	},
	plugins: [
		new CompressPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(jsx|tsx|js|ts|scss|css|html|svg)$/,
			compressionOptions: { level: 9 },
			threshold: 10240,
			minRatio: 0.8,
			deleteOriginalAssets: false
		}),
		new BrotliPlugin({
			filename: '[path].br[query]',
			test: /\.(jsx|tsx|js|ts|scss|css|html|json|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		})
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
		rules: [{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		babelLoader
		]
	},
	resolve: {
		extensions: ['*', '.js']
	}
};