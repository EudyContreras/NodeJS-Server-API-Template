/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const fileLoader = require('../loaders/file.loader');
const urlLoader = require('../loaders/url.loader');
const svgLoader = require('../loaders/svg.loader');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const useCSR = process.env.CSR == 'true';
const enviroment = process.env.NODE_ENV;
const isProduction = enviroment === 'production';
const usePreCompiled = false;
const sourceLocation = usePreCompiled ? 'pre' : 'src';
const publicPath = '../../build/public/';
const entryPoint = `./${sourceLocation}/client/client.${usePreCompiled ? 'js' : 'jsx'}`;

const resources = [
	{
		from: `${sourceLocation}/client/resources/manifest.json`,
		to: ''
	}, {
		from: `${sourceLocation}/client/resources/robots.txt`,
		to: ''
	}, {
		from: `${sourceLocation}/client/resources/styles/material.css`,
		to: 'styles/'
	}];
if (useCSR) {
	resources.push(
		{
			from: `${sourceLocation}/client/resources/html/index.html`,
			to: ''
		}
	);
}

const fileName = useCSR ? 'scripts/[name].bundle.js' : 'scripts/[name].bundle.[chunkhash].js';

const splitChunk = {
	splitChunks: {
		...splitchunks.singleShunk
	}
};

const manifestExclude = ['stats.json', '.DS_Store', '.js.br', '.js.gz', '.js', 'service-worker.ts'];
const pluggins = [
	new CleanWebpackPlugin(),
	new CopyPlugin(resources),
	new HtmlWebpackPlugin({
		template: `${sourceLocation}/client/resources/html/offline.html`,
		filename: 'offline.html',
		minify: {
			collapseWhitespace: true
		}
	}),
	new ManifestPlugin({
		fileName: 'manifest-assets.json',
		publicPath: '',
		generate: (seed, files, entrypoints) => {
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
				files: manifestFiles,
				entryPoints: entrypoints
			};
		}
	})
];

if (isProduction) {
	pluggins.push(
		new ExtractCssChunks(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
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
		new ImageminPlugin({
			config: [{
				test: /\.(jpe?g|png|gif|svg)$/i,
				options: {
					quality: 75
				}
			}]
		})
	);
}

pluggins.push(
	new LoadablePlugin(),
	new WorkboxPlugin.InjectManifest({
		swSrc: path.join(process.cwd(), `${sourceLocation}/workers/serviceWorker.${usePreCompiled ? 'js' : 'ts'}`),
		swDest: `../../${sourceLocation}/workers/service-worker.${usePreCompiled ? 'js' : 'ts'}`,
		exclude: [/\.(js.br|js.gz|DS_Store)$/, /manifest-assets.*\.json$/, /loadable-stats.*\.json$/],
		precacheManifestFilename: 'manifest-precache.[manifestHash].js'
	})
);

module.exports = {
	name: 'client',
	target: 'web',
	mode: enviroment,
	bail: isProduction,
	devtool: isProduction ? 'source-map' : 'inline-source-map',
	entry: entryPoint,
	performance: {
		hints: 'warning'
	},
	plugins: pluggins,
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
		...optimization({ splitChunk: splitChunk, production: isProduction })
	},
	module: {
		rules: [{
			test: /\.(jsx|tsx|ts|js)$/,
			exclude: /(node_modules)/,
			use: 'babel-loader'
		}, {
			test: /\.txt$/,
			use: 'raw-loader'
		}, {
			test: /\.css$/,
			use: [
				ExtractCssChunks.loader,
				{
					loader: 'css-loader',
					options: {
						modules: true,
						localIdentName: '[name]__[local]--[hash:base64:5]'
					}
				}
			]
		},
		fileLoader,
		...imageLoader,
		urlLoader,
		svgLoader,
		styleLoader(path)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};