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
		{
			test: /\.(jsx|tsx|ts|js)$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					env: {
						development: {
							presets: [
								['minify', {
									builtIns: false
								}]
							]
						},
						production: {
							presets: [
								['minify', {
									builtIns: false
								}]
							]
						}
					},
					presets: [
						'@babel/preset-react',
						'@babel/preset-typescript',
						['@babel/preset-env', {
							targets: {
								node: 'current'
							}
						}]
					],
					plugins: [
						['@babel/plugin-proposal-decorators', {
							'legacy': true
						}],
						'@babel/plugin-proposal-object-rest-spread',
						'@babel/plugin-proposal-function-sent',
						'@babel/plugin-proposal-export-namespace-from',
						'@babel/plugin-proposal-numeric-separator',
						'@babel/plugin-proposal-throw-expressions',
		
						// Stage 3
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-syntax-import-meta',
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-json-strings',
						['@babel/plugin-transform-async-to-generator']
					]
				}
			}
		},
		fileLoader,
		urlLoader
		]
	},
	resolve: {
		extensions: ['*', '.js', '.ts']
	}
};