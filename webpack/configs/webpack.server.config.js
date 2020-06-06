/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const optimization = require('../sections/optimization');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const WriteFilePlugin = require('write-file-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const enviroment = process.env.NODE_ENV;

const isProduction = enviroment === 'production';
const usePreCompiled = false;
const sourceLocation = usePreCompiled ? 'pre' : 'src';
const publicPath = '../../build';
const entryPoint = `./${sourceLocation}/server/server.${usePreCompiled ? 'js' : 'ts'}`;

const manifestExclude = ['.DS_Store', '.js.br', '.js.gz', '.js'];

const plugins = [];

if (isProduction) {
	plugins.push(
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
	);
} else {
	plugins.push(
		new WriteFilePlugin()
	);
}
plugins.push(
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1
	}),
	new ManifestPlugin({
		fileName: './public/manifest-image-assets.json',
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
					manifest[extension].push({ name: name, path: file.path.replace('public/','') });
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
	}),
	new LoadablePlugin()
);

module.exports = {
	name: 'server',
	target: 'node',
	mode: enviroment,
	devtool: isProduction ? 'source-map' : 'inline-source-map',
	performance: {
		hints: 'warning'
	},
	entry: [
		'@babel/polyfill', entryPoint
	],
	output: {
		path: path.join(__dirname, publicPath),
		publicPath: '/',
		filename: 'server.js',
		globalObject: 'this'
	},
	plugins: plugins,
	optimization: optimization({ splitChunk: null, production: isProduction }),
	externals: [NodeExternals()],
	module: {
		rules: [{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		{
			test: /\.(jsx|tsx|ts|js)$/,
			exclude: /(node_modules)/,
			use: 'babel-loader'
		},
		...imageLoader('public/images'),
		...styleLoader(path, isProduction)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};