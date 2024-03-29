/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const loaders = require('../loaders');
const WaitPlugin = require('../plugins/WaitPlugin');
const NodeExternals = require('webpack-node-externals');
const optimization = require('../sections/optimization');
const LoadablePlugin = require('@loadable/webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const enviroment = process.env.NODE_ENV;
const precompile = process.env.PRECOMPILE === 'true';
const usesHMR = process.env.REACT_HMR === 'true';
const usesCSR = process.env.CSR === 'true';

const isProduction = enviroment === 'production';
const sourceLocation = precompile ? 'dist' : 'src';
const publicPath = '../../build';
const entryPoint = `./${sourceLocation}/server/server.${usesCSR ? 'csr' : 'ssr' }.${precompile ? 'js' : 'ts'}`;

const plugins = [];

const stats = usesHMR ? { stats: 'minimal' } : { };

if (!usesCSR) {
	plugins.push(new WaitPlugin({ filename: 'build/public/loadable-stats.json' }, 40000));
}
if (isProduction) {
	plugins.push(
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin()
	);
} else {
	if (!usesCSR) {
		plugins.push(
			new NodemonPlugin({
				watch: path.resolve(publicPath),
				script: 'build/server.js',
				ext: 'js,json'
			})
		);
	}
}
plugins.push(
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1
	}),
	new LoadablePlugin({
		filename: 'loadable-stats.json'
	}),
	new webpack.DefinePlugin({
		__CLIENT_RENDERED__: false
	})
);

module.exports = {
	name: 'server',
	target: 'node',
	mode: enviroment,
	cache: !isProduction,
	devtool: isProduction ? false : 'eval-cheap-module-source-map',
	performance: {
		hints: 'warning'
	},
	...stats,
	entry: entryPoint,
	output: {
		path: path.join(__dirname, publicPath),
		publicPath: '/',
		pathinfo: false,
		filename: 'server.js',
		globalObject: 'this'
	},
	plugins: plugins,
	optimization: optimization({ splitChunk: null, production: isProduction, dropConsole: false }),
	externals: [NodeExternals()],
	module: {
		rules: loaders(path, isProduction)
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};
