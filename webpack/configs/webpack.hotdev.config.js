/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const urlLoader = require('../loaders/url.loader');
const svgLoader = require('../loaders/svg.loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const precompile = process.env.PRECOMPILE == 'true';
const enviroment = process.env.NODE_ENV;

const sourceLocation = 'src';
const publicPath = '../../build/public';
const entryPoint = './src/client/client.jsx';

const fileName = './scripts/[name].js';

const splitChunk = {
	splitChunks: {
		...splitchunks.singleShunk
	}
};

const clientConfig = require(`../../${sourceLocation}/configs/config.client.json`);
const pluggins = [
	new MiniCssExtractPlugin(),
	new HtmlWebpackPlugin({
		excludeChunks: [/main.bundle.*.js/, /vendors.bundle.*.js/],
		template: `${sourceLocation}/client/resources/html/offline.hbs`,
		filename: 'offline.html',
		minify: true
	}),
	new HtmlWebpackPlugin({
		template: `${sourceLocation}/client/resources/html/index.hbs`,
		filename: 'index.html',
		scriptLoading: 'defer',
		title: 'Some title',
		clientSideRendered: process.env.CSR == 'true',
		enableSW: process.env.USE_SW == 'true',
		html: clientConfig.html,
		minify: true
	}),
	new LoadablePlugin(),
	new WorkboxPlugin.InjectManifest({
		swSrc: path.join(process.cwd(), `${sourceLocation}/workers/serviceWorker.${precompile ? 'js' : 'ts'}`),
		swDest: `../../${sourceLocation}/workers/service-worker.${precompile ? 'js' : 'ts'}`,
		exclude: [/\.(js.br|js.gz|DS_Store)$/, /manifest-assets.*\.json$/, /loadable-stats.*\.json$/],
		precacheManifestFilename: 'manifest-precache.[manifestHash].js'
	})
];

module.exports = {
	name: 'client',
	target: 'web',
	mode: enviroment,
	bail: false,
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		publicPath: publicPath,
		contentBase: path.join(__dirname, publicPath),
		watchContentBase: true,
		hot: true
	},
	entry: entryPoint,
	performance: {
		hints: 'warning'
	},
	plugins: pluggins,
	output: {
		path: path.join(__dirname, publicPath),
		pathinfo: true,
		filename: fileName,
		publicPath: '/',
		globalObject: 'this'
	},
	externals: {
		jquery: 'jQuery'
	},
	optimization: {
		...optimization({ splitChunk: splitChunk, production: false })
	},
	module: {
		rules: [
			{ test: /\.(jsx|tsx|ts|js)$/, exclude: /(node_modules)/, use: ['react-hot-loader/webpack', 'babel-loader'] }, 
			{ test: /\.hbs$/, loader: 'handlebars-loader' },
			{ test: /\.txt$/, use: 'raw-loader' },
			...imageLoader('images', false),
			...styleLoader(path, false),
			urlLoader,
			svgLoader
		]
	},
	resolve: {
		alias: { 'react-dom': '@hot-loader/react-dom' },
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};