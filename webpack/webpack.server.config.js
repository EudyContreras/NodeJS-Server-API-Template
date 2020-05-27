/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const optimization = require('./sections/optimization');
const babelLoader = require('./loaders/babel.loader');
const styleLoader = require('./loaders/style.loader');
const fileLoader = require('./loaders/file.loader');

const enviroment = process.env.NODE_ENV;

const isProduction = enviroment === 'production';
const publicPath = '../build';

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
		filename: 'server.js',
		globalObject: 'this'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ManifestPlugin({
			fileName: 'manifest-assets.json',
			publicPath: publicPath,
			generate: (seed, files, entrypoints) => {
				const manifestFiles = files.reduce((manifest, file) => {
					if (!file.name.endsWith('.DS_Store') && !file.name.endsWith('.js.br') && !file.name.endsWith('.js.gz')) {
						manifest[file.name] = file.path;
					}
					return manifest;
				}, seed);
				const entrypointFiles = entrypoints.main.filter(
					fileName => !fileName.endsWith('.map')
				);
	
				return {
					files: manifestFiles,
					entryPoints: entrypointFiles
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
		{
			test: /\.(jpe?g|png)$/i,
			loader: 'responsive-loader',
			options: {
				name: 'icons/[name]-[width]x[width].[ext]',
				outputPath:'public/images',
				sizes: [16, 32, 48, 52, 57, 64, 72, 76, 96, 120, 128, 144, 152, 168, 192, 256, 348, 512],
				placeholder: true,
				placeholderSize: 50,
				adapter: require('responsive-loader/sharp')
			}
		},
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};