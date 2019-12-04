const TerserPlugin = require('terser-webpack-plugin');

module.exports = (enviroment, splitChunk) => ({
	minimize: false,
	minimizer: [new TerserPlugin({
		test: /\.(js|jsx|tsx|ts)$/i,
		extractComments: false,
		chunkFilter: (chunk) => {
			if (chunk.name.startsWith('vendor')) {
				return false;
			}
			return true;
		},
		terserOptions: {
			ecma: 6,
			warnings: false,
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
	...splitChunk
});