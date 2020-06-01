/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');

const developmentOptimization = (splitChunk) => ({
	minimize: false,
	namedModules: true,
	namedChunks: true,
	nodeEnv: 'development',
	mangleWasmImports: false,
	concatenateModules: false,
	...splitChunk
});

const productionOptimization = (splitChunk) => ({
	minimize: true,
	minimizer: [
		new TerserPlugin({
			test: /\.(js|jsx|tsx|ts)$/i,
			sourceMap: false,
			extractComments: false,
			chunkFilter: (chunk) => {
				if (chunk.name != null) {
					if (chunk.name.startsWith('vendor')) {
						return true;
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
	nodeEnv: 'production',
	providedExports: true,
	concatenateModules: true,
	removeAvailableModules: true,
	removeEmptyChunks: true,
	mangleWasmImports: true,
	...splitChunk
});

module.exports = ({ splitChunk, production = false }) => (
	{ ...(production ? productionOptimization(splitChunk) : developmentOptimization(splitChunk)) }
);
