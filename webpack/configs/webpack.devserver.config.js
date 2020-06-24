/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const tsLoader = require('../loaders/ts.loader');

const enviroment = process.env.NODE_ENV;

const publicPath = '../../build/public';
const entryPoint = './src/client/client.jsx';

const fileName = './scripts/[name].js';

const pluggins = [
	new LoadablePlugin(),
	new ReactRefreshWebpackPlugin()
];

const splitChunk = {
	splitChunks: {
		...splitchunks.singleShunk
	}
};

module.exports = {
	name: 'client',
	target: 'web',
	mode: 'development',
	bail: true,
	cache: true,
	devtool: false,
	stats: 'minimal',
	devServer: {
		publicPath: publicPath,
		contentBase: path.join(__dirname, publicPath),
		historyApiFallback: true,
		open: {
			app: ['Google Chrome', '--incognito']
		},
		hot: true
	},
	entry: entryPoint,
	performance: {
		hints: false
	},
	plugins: pluggins,
	output: {
		path: path.join(__dirname, publicPath),
		pathinfo: false,
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
			{ test: /\.(jsx|tsx|ts)$/, include: path.resolve(__dirname, '../../src/client'), exclude: /(node_modules)/, use: 'babel-loader' }, 
			{ test: /\.hbs$/, loader: 'handlebars-loader' },
			...imageLoader('images', false),
			...styleLoader(path, false)
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss']
	}
};