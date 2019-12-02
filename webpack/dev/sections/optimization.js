
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (enviroment) => ({
	minimize: true,
	minimizer: [new TerserPlugin({
		test: /\.(js|jsx|tsx|ts)$/i,
		extractComments: false,
		chunkFilter: (chunk) => {
			if (chunk.name === 'vendor') {
				return false;
			}
			return true;
		},
		terserOptions: {
			ecma: 6,
			warnings: true,
			parse: {},
			compress: {
				drop_console: true
			},
			mangle: true,
			module: true,
			output: {
				comments: false,
			},
			toplevel: true,
			nameCache: null,
			ie8: false,
			keep_classnames: undefined,
			keep_fnames: false,
			safari10: false,
		},
	})],
	nodeEnv: enviroment,
	removeAvailableModules: true,
	mergeDuplicateChunks: true,
	removeEmptyChunks: true,
	//   runtimeChunk: 'single',
	//   splitChunks: {
	//     chunks: 'all',
	//     maxInitialRequests: Infinity,
	//     minSize: 0,
	//     cacheGroups: {
	//       commons: {
	//         reuseExistingChunk: true,
	//         enforce: true,
	//         chunks: 'async',
	//         test: /[\\/]node_modules[\\/]/,
	//         // cacheGroupKey here is `commons` as the key of the cacheGroup
	//         name(module, chunks, cacheGroupKey) {
	//           const folder = 'common';
	//           const moduleFileName = module.identifier().split('/').reduceRight(item => item);
	//           const allChunksNames = chunks.map((item) => item.name).join('~');
	//           return `${folder}/${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
	//         },
	//         chunks: 'all'
	//       },
	//       vendor: {
	//         chunks: 'all',
	//         test: /[\\/]node_modules[\\/]/,
	//         name(module, chunks, cacheGroupKey) {
	//           const folder = 'vendor';
	//           // get the name. E.g. node_modules/packageName/not/this/part.js
	//           // or node_modules/packageName

	//           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
	//           const allChunksNames = chunks.map((item) => item.name).join('~');
	//           // npm package names are URL-safe, but some servers don't like @ symbols
	//           return `${folder}/${cacheGroupKey}-${allChunksNames}-${packageName.replace('@', '')}`;
	//         },
	//       },
	//     },
	//   },
});