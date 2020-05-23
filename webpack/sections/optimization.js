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
				if (chunk.name != null) {
					if (chunk.name.startsWith('vendor')) {
						return minimizeVendors && production;
					}
				}
				return true;
			},
			terserOptions: {
				parse: {
					ecma: 8
				},
				compress: {
					ecma: 5,
					warnings: true,
					comparisons: false,
					drop_console: production,
					inline: 2
				},
				mangle: {
					safari10: true
				},
				keep_classnames: !production,
				keep_fnames: !production,
				output: {
					ecma: 5,
					comments: !production,
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