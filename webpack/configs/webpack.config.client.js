
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const loaders = require('../loaders');
const packageJson = require('../../package.json');
const EnvDefiner = require('../sections/envdefiner');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const BundleAnalyzerPlugin = require('@bundle-analyzer/webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const optimization = require('../sections/optimization');
const splitchunks = require('../sections/splitchunks');
const ImageminPlugin= require('imagemin-webp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const precompile = process.env.PRECOMPILE === 'true';
const usesCSR = process.env.CSR === 'true';
const enviroment = process.env.NODE_ENV;
const bundleToken = process.env.BUNDLE_ANALYZER_TOKEN;

const isProduction = enviroment === 'production';
const sourceLocation = precompile ? 'dist' : 'src';
const publicPath = '../../build/public';
const entryPoint = `./${sourceLocation}/client/client.${precompile ? 'js' : 'tsx'}`;

const resources = [
	{
		from: `${sourceLocation}/client/resources/manifest.json`,
		to: ''
	}, {
		from: `${sourceLocation}/client/resources/robots.txt`,
		to: ''
	}, {
		from: `${sourceLocation}/client/resources/styles/fonts.css`,
		to: 'styles/'
	}
];

const fileName = isProduction ? 'scripts/[name].bundle.[chunkhash].js' : 'scripts/[name].bundle.js';
const chunkFileName = isProduction ? 'scripts/[name].chunk.[chunkhash].js' : 'scripts/[name].chunk.js';

const splitChunk = {
	splitChunks: {
		...splitchunks().singleChunk
	}
};

const manifestExclude = ['stats.json', '.DS_Store', '.js', 'service-worker.ts', 'service-worker.js', 'service-worker.js.gz', 'service-worker.js.br', 'loadable-stats.json'];
const plugins = [
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
					const extensionPart = nameSections[nameSections.length - 1];
					const extension = (extensionPart.indexOf('?') !== -1) ? extensionPart.split('?')[0] : extensionPart;
					if (!(extension in manifest)) {
						manifest[extension] = [];
					}
					manifest[extension].push(file.path);
				}
				return manifest;
			}, seed);
			
			const scripts = entrypoints.app.filter(x => x.endsWith('.js'));
			const broliScripts = isProduction ? manifestFiles.br.filter(x => x.endsWith('.js.br')).map(x => x) : null;
			const gzipScripts = isProduction ? manifestFiles.gz.filter(x => x.endsWith('.js.gz')).map(x => x) : null;

			const styles = entrypoints.app.filter(x => x.endsWith('.css'));
			const broliStyles = isProduction ? manifestFiles.br.filter(x => x.endsWith('.css.br')).map(x => x) : null;
			const gzipStyles = isProduction ? manifestFiles.gz.filter(x => x.endsWith('.css.gz')).map(x => x) : null;

			return {
				files: manifestFiles,
				styles: {
					uncompressed: styles,
					brotliCompressed: broliStyles,
					gzipCompressed: gzipStyles
				},
				scripts: {
					uncompressed: scripts,
					brotliCompressed: broliScripts,
					gzipCompressed: gzipScripts
				}
			};
		}
	}),
	new DuplicatePackageCheckerPlugin(),
	// new BundleAnalyzerPlugin({ token: bundleToken }),
	new CleanWebpackPlugin({ cleanStaleWebpackAssets: isProduction }),
	new CopyPlugin({ patterns: resources }),
	new HtmlWebpackPlugin({
		excludeChunks: [/main.bundle.*.js/, /vendors.bundle.*.js/],
		template: `${sourceLocation}/client/resources/html/offline.hbs`,
		filename: 'offline.html',
		minify: true
	}),
	new webpack.WatchIgnorePlugin([
		/css\.d\.ts$/
	]),
	new webpack.DefinePlugin(EnvDefiner(packageJson.version))
];

if (usesCSR) {
	const clientConfig = require(`../../${sourceLocation}/configs/config.client.json`);

	plugins.push(
		new HtmlWebpackPlugin({
			template: `${sourceLocation}/client/resources/html/index.hbs`,
			filename: 'index.html',
			scriptLoading: 'defer',
			title: 'Template Engine',
			clientSideRendered: process.env.CSR === 'true',
			enableSW: process.env.USE_SW === 'true',
			html: clientConfig.html,
			minify: true
		})
	);
}

plugins.push(
	new ImageminPlugin({
		config: [{
			test: /\.(jpe?g|png|gif|svg)$/i,
			disable: !isProduction,
			options: {
				quality: 75
			}
		}]
	}),
	new LoadablePlugin()
);

if (isProduction) {
	plugins.push(
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new CompressPlugin({
			filename: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css|html|json|svg)$/,
			compressionOptions: { level: 9 },
			threshold: 5120,
			minRatio: 0.8,
			deleteOriginalAssets: false
		}),
		new BrotliPlugin({
			filename: '[path].br[query]',
			test: /\.(js|css|html|json|svg)$/,
			threshold: 5120,
			minRatio: 0.8
		})
	);
}

plugins.push(new WorkboxPlugin.InjectManifest({
	maximumFileSizeToCacheInBytes: 6000000,
	swSrc: path.join(process.cwd(), `${sourceLocation}/workers/serviceWorker.${precompile ? 'js' : 'ts'}`),
	swDest: `${publicPath}/service-worker.js`,
	compileSrc: true,
	exclude: [/\.(DS_Store)$/, /manifest-assets.*\.json$/, /service-worker.*\.js$/, /service-worker.js/, /loadable-stats.*\.json$/],
	webpackCompilationPlugins: []
}));

module.exports = {
	name: 'client',
	target: 'web',
	mode: enviroment,
	bail: isProduction,
	devtool: isProduction ? false : 'eval-cheap-module-source-map',
	entry: { app: entryPoint },
	cache: !isProduction,
	performance: {
		hints: isProduction ? 'warning' : false,
		maxAssetSize: 200 * 1024, 
		maxEntrypointSize: 200 * 1024
	},
	plugins: plugins,
	output: {
		path: path.join(__dirname, publicPath),
		pathinfo: false,
		filename: fileName,
		chunkFilename: chunkFileName,
		publicPath: '/',
		globalObject: 'this'
	},
	externals: {
		jquery: 'jQuery'
	},
	optimization: {
		...optimization({ splitChunk: splitChunk, production: isProduction, dropConsole: false })
	},
	module: {
		rules: loaders(path, isProduction)
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
	}
};
