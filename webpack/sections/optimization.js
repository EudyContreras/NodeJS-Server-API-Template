/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');

const minimizeVendors = true;

module.exports = ({ enviroment, splitChunk, useSourceMap, production = false }) => ({
	minimize: production,
	minimizer: [
		new TerserPlugin({
			test: /\.(js|jsx|tsx|ts)$/i,
			sourceMap: useSourceMap,
			extractComments: false,
			chunkFilter: (chunk) => {
				if (chunk.name.startsWith('vendor')) {
					return minimizeVendors && production;
				}
				return true;
			},
			terserOptions: {
				parse: {
					ecma: 8
				},
				compress: {
					ecma: 5,
					warnings: false,
					comparisons: false,
					drop_console: false,
					inline: 2
				},
				mangle: {
					safari10: true
				},
				keep_classnames: false,
				keep_fnames: false,
				output: {
					ecma: 5,
					comments: false,
					ascii_only: true
				}
			}
		})
	],
	nodeEnv: enviroment,
	providedExports: true,
	concatenateModules: true,
	removeAvailableModules: true,
	mangleWasmImports: true,
	removeEmptyChunks: true,
	...splitChunk
});