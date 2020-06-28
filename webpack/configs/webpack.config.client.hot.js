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

const serverPort = process.env.PORT;
const usesCSR = process.env.CSR === 'true';

const publicPath = '../../build/public';
const entryPoint = './src/client/client.jsx';

const fileName = './scripts/[name].js';
const serverURL = `http://localhost:${serverPort}`;

const pluggins = [
	new ReactRefreshWebpackPlugin(),
	new LoadablePlugin()
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
	devtool: 'eval-cheap-source-map',
	stats: 'minimal',
	devServer: {
		port: Number.parseInt(process.env.PORT_HTTP),
		publicPath: publicPath,
		contentBase: publicPath,
		watchContentBase: true,
		writeToDisk: !usesCSR,
		historyApiFallback: true,
		open: {
			app: ['Google Chrome', '--incognito']
		},
		proxy: {
			'/': {
				target: serverURL,
				secure: false
			},
			'/rest/api': {
				target: serverURL,
				secure: false
			}
		},
		watchOptions: {
			poll: true
		},
		hotOnly: true
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
		globalObject: 'this',
		hotUpdateChunkFilename: '.hot/hot-update.js',
		hotUpdateMainFilename: '.hot/hot-update.json'
	},
	externals: {
		jquery: 'jQuery'
	},
	optimization: {
		...optimization({ splitChunk: splitChunk, production: false })
	},
	module: {
		rules: [
			tsLoader,
			{ test: /\.(jsx|tsx|ts)$/, include: path.resolve(__dirname, '../../src/client'), exclude: /(node_modules)/, use: 'babel-loader' }, 
			{ test: /\.hbs$/, loader: 'handlebars-loader' },
			...imageLoader('images', false),
			...styleLoader(path, false)
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss']
	}
};