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
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const useCSR = process.env.CSR == 'true';
const useSourceMap = process.env.GENERATE_SOURCEMAP == 'true';

const enviroment = process.env.NODE_ENV;
const publicPath = '../build/public/';
const entryPoint = './src/client/client.jsx';

const isProduction = enviroment == 'production';
const isDevelopement = enviroment == 'development';

const resources = [
	{
		from: 'workers/helpers',
		to: 'helpers'
	}, {
		from: 'workers/constants.js',
		to: ''
	}, {
		from: 'src/client/scriptsjs/loader.js',
		to: 'static/scripts'
	}, {
		from: 'src/client/resources/manifest.json',
		to: ''
	}, {
		from: 'src/client/resources/robots.txt',
		to: ''
	}, {
		from: 'src/client/resources/images',
		to: 'static/images'
	}];
if (useCSR) {
	resources.push(
		{
			from: 'src/client/resources/index.html',
			to: ''
		}
	);
}

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
					if (!file.name.endsWith('.DS_Store')) {
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
			test: /\.(jsx|tsx|js|ts|scss|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new WorkboxPlugin.InjectManifest({
			swSrc: 'workers/serviceWorker.js',
			swDest: 'service-worker.js',
			exclude: [/\.(DS_Store)$/, /manifest-assets.*\.json$/],
			precacheManifestFilename: 'manifest-precache.[manifestHash].js'
		})
	],
	output: {
		path: path.join(__dirname, publicPath),
		futureEmitAssets: isProduction,
		pathinfo: isDevelopement,
		filename: 'static/scripts/[name].[chunkhash].js',
		// chunkFilename: 'static/scripts/[name].[chunkhash].chunk.js',
		publicPath: '/',
		globalObject: 'this'
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
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};