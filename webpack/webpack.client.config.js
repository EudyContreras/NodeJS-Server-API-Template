/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const optimization = require('./sections/optimization');
const splitchunks = require('./sections/splitchunks');
const babelLoader = require('./loaders/babel.loader');
const imageLoader = require('./loaders/image.loader');
const styleLoader = require('./loaders/style.loader');
const fileLoader = require('./loaders/file.loader');
const urlLoader = require('./loaders/url.loader');
const svgLoader = require('./loaders/svg.loader');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const useCSR = process.env.CSR == 'true';
const useSourceMap = process.env.GENERATE_SOURCEMAP == 'true';

const enviroment = process.env.NODE_ENV;
const publicPath = '../build/public/';
const entryPoint = './pre/client/client.js';

const isProduction = enviroment == 'production';

const resources = [
	{
		from: 'src/client/resources/manifest.json',
		to: ''
	}, {
		from: 'src/client/resources/robots.txt',
		to: ''
	}, {
		from: 'src/client/resources/styles/material.css',
		to: 'styles/'
	}];
if (useCSR) {
	resources.push(
		{
			from: 'src/client/resources/html/index.html',
			to: ''
		}
	);
}

function getChunkHash() {
	const date = new Date();
	const day = date.getDay();
	const month = date.getMonth();
	const year = date.getFullYear();
	const hour = date.getUTCHours();
	return `${day}${month}${year}${hour}`;
}

const fileName = useCSR ? 'static/scripts/[name].js' : `static/scripts/[name]${getChunkHash()}.js`;

const splitChunk = {
	splitChunks: {
		...splitchunks.singleShunk
	}
};

module.exports = {
	name: 'client',
	target: 'web',
	mode: enviroment,
	bail: isProduction,
	entry: entryPoint,
	performance: {
		hints: false
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyPlugin(resources),
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
		}),
		new CompressPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css|html|json|svg)$/,
			compressionOptions: { level: 9 },
			threshold: 10240,
			minRatio: 0.8,
			deleteOriginalAssets: false
		}),
		new BrotliPlugin({
			filename: '[path].br[query]',
			test: /\.(js|css|html|json|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new WorkboxPlugin.InjectManifest({
			swSrc: 'src/workers/serviceWorker.js',
			swDest: '../../src/workers/service-worker.js',
			exclude: [/\.(js.br|js.gz|DS_Store)$/, /manifest-assets.*\.json$/],
			precacheManifestFilename: 'manifest-precache.[manifestHash].js'
		})
	],
	output: {
		path: path.join(__dirname, publicPath),
		futureEmitAssets: isProduction,
		pathinfo: !isProduction,
		filename: fileName,
		publicPath: '/',
		globalObject: 'this'
	},
	externals: {
		jquery: 'jQuery'
	},
	optimization: {
		...optimization({ enviroment, splitChunk, useSourceMap, production: isProduction })
	},
	module: {
		rules: [{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		babelLoader,
		fileLoader,
		imageLoader,
		urlLoader,
		svgLoader,
		{
			test: /\.(jpe?g|png)$/i,
			loader: 'responsive-loader',
			options: {
				sizes: [180, 300, 600, 1200, 2000],
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