
/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');

const developmentOptimization = () => ({
	minimize: false,
	namedModules: true,
	namedChunks: true,
	nodeEnv: 'development',
	mangleWasmImports: false,
	concatenateModules: false,
	removeAvailableModules: false,
	removeEmptyChunks: false
});

const productionOptimization = (splitChunk, dropConsole) => ({
	minimize: true,
	minimizer: [
		new TerserPlugin({
			test: /\.(js|jsx|tsx|ts)$/i,
			cache: true,
			parallel: true,
			sourceMap: false,
			extractComments: false,
			chunkFilter: (chunk) => {
				if (chunk.name != null) {
					if (chunk.name.startsWith('vendors')) {
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
					drop_console: dropConsole,
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
	chunkIds: false,
	moduleIds: false,
	providedExports: true,
	concatenateModules: true,
	mergeDuplicateChunks: true,
	removeAvailableModules: true,
	removeEmptyChunks: true,
	mangleWasmImports: true,
	...splitChunk
});

module.exports = ({ splitChunk, production = false, dropConsole = false }) => (
	{ ...(production ? productionOptimization(splitChunk, dropConsole) : developmentOptimization()) }
);
