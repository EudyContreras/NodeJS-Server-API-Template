/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const NodeExternals = require('webpack-node-externals');
const optimization = require('../sections/optimization');
const babelLoader = require('../loaders/babel.loader');
const styleLoader = require('../loaders/style.loader');
const fileLoader = require('../loaders/file.loader');

const enviroment = 'development';

module.exports = {
	name: 'server',
	target: 'node',
	mode: enviroment,
	performance: {
		hints: false
	},
	entry: [
		'@babel/polyfill', './src/server.ts'
	],
	output: {
		path: path.join(__dirname, '../../build'),
		filename: 'server.js',
		globalObject: 'this'
	},
	plugins: [

	],
	optimization: optimization({ enviroment: enviroment, production: false }),
	externals: [NodeExternals()],
	module: {
		rules: [{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		babelLoader,
		fileLoader,
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	},
};