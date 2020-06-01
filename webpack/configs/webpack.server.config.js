/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const optimization = require('../sections/optimization');
const babelLoader = require('../loaders/babel.loader');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const fileLoader = require('../loaders/file.loader');
const enviroment = process.env.NODE_ENV;

const isProduction = enviroment === 'production';
const publicPath = '../../build/public';
const entryPoint = './src/server/server.ts';

const manifestExclude = ['.DS_Store', '.js.br', '.js.gz', '.js'];

module.exports = {
	name: 'server',
	target: 'node',
	mode: enviroment,
	devtool: 'inline-source-map',
	performance: {
		hints: false
	},
	entry: [
		'@babel/polyfill', entryPoint
	],
	output: {
		path: path.join(__dirname, publicPath),
		publicPath: '/',
		filename: '../server.js',
		globalObject: 'this'
	},
	plugins: [
		new ManifestPlugin({
			fileName: 'manifest-image-assets.json',
			publicPath: '',
			generate: (seed, files) => {
				const manifestFiles = files.reduce((manifest, file) => {
					const endChecker = (ending) => file.name.endsWith(ending);
					if (!manifestExclude.some(endChecker)) {
						const parts = file.name.split('/');
						const name = parts[parts.length - 1];
						const nameSections = name.split('.');
						const extension = nameSections[nameSections.length - 1];

						if (!(extension in manifest)) {
							manifest[extension] = [];
						}
						manifest[extension].push({ name: name, path: file.path });
					}
					return manifest;
				}, seed);
		
				return {
					files: manifestFiles
				};
			}
		}),
		new MiniCssExtractPlugin(),
		new ImageminPlugin({
			config: [{
				test: /\.(jpe?g|png|gif|svg)$/i,
				options: {
					quality: 75
				}
			}]
		})
	],
	optimization: optimization({ splitChunk: null, production: isProduction }),
	externals: [NodeExternals()],
	module: {
		rules: [{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		{
			test: /\.css$/i,
			use: [MiniCssExtractPlugin.loader, 'css-loader']
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
		...imageLoader,
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};