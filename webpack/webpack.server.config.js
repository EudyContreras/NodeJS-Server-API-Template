/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const CompressPlugin = require('compression-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const optimization = require('./sections/optimization');
const imageLoader = require('./loaders/image.loader');
const babelLoader = require('./loaders/babel.loader');
const styleLoader = require('./loaders/style.loader');
const fileLoader = require('./loaders/file.loader');

const enviroment = process.env.NODE_ENV;

const isProduction = enviroment == 'production';

module.exports = {
	name: 'server',
	target: 'node',
	mode: enviroment,
	performance: {
		hints: false
	},
	entry: [
		'@babel/polyfill', './src/server/server.ts'
	],
	output: {
		path: path.join(__dirname, '../build'),
		filename: 'server.js',
		globalObject: 'this'
	},
	plugins: [
		new CompressPlugin({
			filename: '[path].br[query]',
			algorithm: 'brotliCompress',
			test: /\.(jsx|tsx|js|ts|scss|css|html|svg)$/,
			compressionOptions: { level: 11 },
			threshold: 10240,
			minRatio: 0.8,
			deleteOriginalAssets: false
		})
	],
	optimization: optimization({ enviroment: enviroment, production: isProduction }),
	externals: [NodeExternals()],
	module: {
		rules: [{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		babelLoader,
		fileLoader,
		imageLoader,
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};