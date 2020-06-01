/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');
const babelLoader = require('../loaders/babel.loader');
const imageLoader = require('../loaders/image.loader');
const styleLoader = require('../loaders/style.loader');
const fileLoader = require('../loaders/file.loader');
const urlLoader = require('../loaders/url.loader');
const svgLoader = require('../loaders/svg.loader');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const useCSR = process.env.CSR == 'true';
const enviroment = process.env.NODE_ENV;
const isProduction = enviroment === 'production';

const publicPath = '../../build/public/';
const entryPoint = './src/client/client.jsx';

const resources = [
	{
		from: 'src/client/resources/manifest.json',
		to: ''
	}, {
		from: 'src/client/resources/robots.txt',
		to: ''
	}, {
		from: 'src/client/resources/styles/material.css',
		to: 'styles/'
	}];
if (useCSR) {
	resources.push(
		{
			from: 'src/client/resources/html/index.html',
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
	new CopyPlugin(resources),
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
	}),
	new ImageminPlugin({
		config: [{
			test: /\.(jpe?g|png|gif|svg)$/i,
			options: {
				quality: 75
			}
		}]
	}),
	new LoadablePlugin()
];

if (isProduction) {
	pluggins.push(
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

pluggins.push(new WorkboxPlugin.InjectManifest({
	swSrc: path.join(process.cwd(), 'src/workers/serviceWorker.ts'),
	swDest: '../../src/workers/service-worker.ts',
	exclude: [/\.(js.br|js.gz|DS_Store)$/, /manifest-assets.*\.json$/, /loadable-stats.*\.json$/],
	precacheManifestFilename: 'manifest-precache.[manifestHash].js'
}));

module.exports = {
	name: 'client',
	target: 'web',
	mode: enviroment,
	bail: isProduction,
	devtool: 'inline-source-map',
	entry: entryPoint,
	performance: {
		hints: false
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
			test: /\.txt$/,
			use: 'raw-loader'
		},
		{
			test: /\.(jsx|tsx|ts|js)$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					env: {
						development: {
							presets: [
								['minify', {
									builtIns: false
								}]
							]
						},
						production: {
							presets: [
								['minify', {
									builtIns: false
								}]
							]
						}
					},
					presets: [
						'@babel/preset-react',
						'@babel/preset-typescript',
						['@babel/preset-env', {
							targets: {
								node: 'current'
							}
						}]
					],
					plugins: [
						['@babel/plugin-proposal-decorators', {
							'legacy': true
						}],
						'@loadable/babel-plugin',
						'@babel/plugin-proposal-object-rest-spread',
						'@babel/plugin-proposal-function-sent',
						'@babel/plugin-proposal-export-namespace-from',
						'@babel/plugin-proposal-numeric-separator',
						'@babel/plugin-proposal-throw-expressions',
		
						// Stage 3
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-syntax-import-meta',
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-json-strings',
						['@babel/plugin-transform-async-to-generator']
					]
				}
			}
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