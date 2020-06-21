/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const svgLoader = require('../loaders/svg.loader');

const enviroment = process.env.NODE_ENV;

const publicPath = '../../build/public';
const entryPoint = './src/client/client.jsx';

const fileName = './scripts/[name].js';

const splitChunk = {
	splitChunks: {
		...splitchunks.singleShunk
	}
};

const pluggins = [
	new MiniCssExtractPlugin(),
	new LoadablePlugin(),
	new ReactRefreshWebpackPlugin()
];

module.exports = {
	name: 'client',
	target: 'web',
	mode: enviroment,
	bail: false,
	devtool: 'inline-source-map',
	devServer: {
		publicPath: publicPath,
		contentBase: path.join(__dirname, publicPath),
		historyApiFallback: true,
		watchContentBase: true,
		hot: true
	},
	entry: entryPoint,
	performance: {
		hints: false
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
			{ test: /\.(jsx|tsx|ts|js)$/, exclude: /(node_modules)/, use: 'babel-loader' }, 
			{ test: /\.hbs$/, loader: 'handlebars-loader' },
			{ test: /\.txt$/, use: 'raw-loader' },
			...imageLoader('images', false),
			...styleLoader(path, false),
			svgLoader
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};