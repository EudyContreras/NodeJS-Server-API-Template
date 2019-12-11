
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const NodeExternals = require('webpack-node-externals');
const typescriptLoader = require('../loaders/tyscript.loader');
const optimization = require('../sections/optimization');
const babelLoader = require('../loaders/babel.loader');
const styleLoader = require('../loaders/style.loader');
const fileLoader = require('../loaders/file.loader');

const enviroment = 'production';

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
		path: path.join(__dirname, '../../dist'),
		filename: 'server.js',
		globalObject: 'this'
	},
	plugins: [

	],
	optimization: optimization({ enviroment: enviroment, production: true }),
	externals: [NodeExternals()],
	module: {
		rules: [{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		babelLoader,
		fileLoader,
		typescriptLoader,
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	},
};