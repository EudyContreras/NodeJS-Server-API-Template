/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const loaders = require('../loaders');
const WaitPlugin = require('../plugins/WaitPlugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');

const serverPort = process.env.PORT;
const usesCSR = process.env.CSR === 'true';

const publicPath = '../../build/public';
const entryPoint = './src/client/client.jsx';

const fileName = './scripts/[name].js';
const serverURL = `http://localhost:${serverPort}`;

const proxyOptions = !usesCSR ? {
	proxy: {
		'/': {
			target: serverURL,
			secure: false
		},
		'/rest/api': {
			target: serverURL,
			secure: false
		}
	}
} : { };
const pluggins = [
	new WaitPlugin({ filename: 'build/loadable-stats.json', timeout: 15000 }),
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
		contentBase: usesCSR ? path.join(__dirname, publicPath) : publicPath,
		watchContentBase: false,
		writeToDisk: !usesCSR,
		historyApiFallback: true,
		open: {
			app: ['Google Chrome', '--incognito']
		},
		...proxyOptions,
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
		globalObject: 'this'
	},
	externals: {
		jquery: 'jQuery'
	},
	optimization: {
		...optimization({ splitChunk: splitChunk, production: false })
	},
	module: {
		rules: loaders(path, false)
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss']
	}
};