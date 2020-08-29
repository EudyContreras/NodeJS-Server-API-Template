/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const loaders = require('../loaders');
const EnvDefiner = require('../sections/envdefiner');
const WaitPlugin = require('../plugins/WaitPlugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');

const serverPort = process.env.PORT;
const usesCSR = process.env.CSR === 'true';

const publicPath = '../../build/public';
const entryPoint = './src/client/client.tsx';

const fileName = 'scripts/[name].bundle.js';
const serverURL = `http://localhost:${serverPort}`;

const proxyOptions = !usesCSR ? {
	proxy: {
		'/': {
			target: serverURL,
			changeOrigin: true,
			secure: false,
			headers: {
				'Connection': 'keep-alive'
			}
		},
		'/rest/api': {
			target: serverURL,
			changeOrigin: true,
			secure: false,
			headers: {
				'Connection': 'keep-alive'
			}
		}
	}
} : { };

const pluggins = [
	new webpack.DefinePlugin(EnvDefiner()),
	new ReactRefreshWebpackPlugin(),
	new LoadablePlugin()
];

if (!usesCSR) {
	pluggins.push(new WaitPlugin({ filename: 'build/loadable-stats.json', timeout: 40000 }));
}

const splitChunk = {
	splitChunks: {
		...splitchunks(false).singleChunk
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
	entry: { app: entryPoint },
	devServer: {
		port: 8081,
		publicPath: publicPath,
		contentBase: usesCSR ? path.join(__dirname, publicPath) : publicPath,
		watchContentBase: false,
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
		...optimization({ splitChunk: splitChunk, production: false, dropConsole: false })
	},
	module: {
		rules: loaders(path, false)
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};
