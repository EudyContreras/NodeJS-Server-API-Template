/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const urlLoader = require('../loaders/url.loader');
const svgLoader = require('../loaders/svg.loader');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const precompile = process.env.PRECOMPILE == 'true';
const usesCSR = process.env.CSR == 'true';
const enviroment = process.env.NODE_ENV;

const isProduction = enviroment === 'production';
const sourceLocation = precompile ? 'pre' : 'src';
const publicPath = '../../build/public';
const entryPoint = `./${sourceLocation}/client/client.${precompile ? 'js' : 'jsx'}`;

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
	}
];

const fileName = isProduction ? './scripts/[name].bundle.[chunkhash].js' : './scripts/[name].js';

const splitChunk = {
	splitChunks: {
		...splitchunks.singleShunk
	}
};

const manifestExclude = ['stats.json', '.DS_Store', '.js.br', '.js.gz', '.js', 'service-worker.ts', 'loadable-stats.json'];
const pluggins = [
	new CleanWebpackPlugin({ cleanStaleWebpackAssets: isProduction }),
	new CopyPlugin(resources),
	new MiniCssExtractPlugin(),
	new HtmlWebpackPlugin({
		excludeChunks: [/main.bundle.*.js/, /vendors.bundle.*.js/],
		template: `${sourceLocation}/client/resources/html/offline.hbs`,
		filename: 'offline.html',
		minify: true
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

if (usesCSR) {
	const clientConfig = require(`../../${sourceLocation}/configs/config.client.json`);

	pluggins.push(
		new HtmlWebpackPlugin({
			template: `${sourceLocation}/client/resources/html/index.hbs`,
			filename: 'index.html',
			scriptLoading: 'defer',
			title: 'Template Engine',
			clientSideRendered: process.env.CSR == 'true',
			enableSW: process.env.USE_SW == 'true',
			html: clientConfig.html,
			minify: true
		})
	);
}
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
		})
	);
}

pluggins.push(
	new ImageminPlugin({
		config: [{
			test: /\.(jpe?g|png|gif|svg)$/i,
			options: {
				quality: 75
			}
		}]
	}),
	new LoadablePlugin(),
	new WorkboxPlugin.InjectManifest({
		swSrc: path.join(process.cwd(), `${sourceLocation}/workers/serviceWorker.${precompile ? 'js' : 'ts'}`),
		swDest: `../../${sourceLocation}/workers/service-worker.${precompile ? 'js' : 'ts'}`,
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
	devServer: {
		contentBase: path.join(__dirname, publicPath),
		hot: true
	},
	entry: entryPoint,
	performance: {
		hints: 'warning'
	},
	plugins: pluggins,
	output: {
		path: path.join(__dirname, publicPath),
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
		rules: [
			{ test: /\.(jsx|tsx|ts|js)$/, exclude: /(node_modules)/, use: ['react-hot-loader/webpack', 'babel-loader'] }, 
			{ test: /\.hbs$/, loader: 'handlebars-loader' },
			{ test: /\.txt$/, use: 'raw-loader' },
			...imageLoader('images', true),
			...styleLoader(path, isProduction),
			urlLoader,
			svgLoader
		]
	},
	resolve: {
		alias: { 'react-dom': '@hot-loader/react-dom' },
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};