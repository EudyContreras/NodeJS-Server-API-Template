/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
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
		'@babel/polyfill', isProduction ? './pre/server/server.js' : './src/server/server.ts'
	],
	output: {
		path: path.join(__dirname, publicPath),
		publicPath: '/',
		filename: '../server.js',
		globalObject: 'this'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
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
		babelLoader,
		fileLoader,
		...imageLoader,
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};