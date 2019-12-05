const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

module.exports = (enviroment, splitChunk, useSourceMap) => ({
	minimize: enviroment == 'production',
	minimizer: [
		new TerserPlugin({
			test: /\.(js|jsx|tsx|ts)$/i,
			sourceMap: useSourceMap,
			extractComments: false,
			chunkFilter: (chunk) => {
				if (chunk.name.startsWith('vendor')) {
					return false;
				}
				return true;
			},
			terserOptions: {
				parse: {
					ecma: 8,
				},
				compress: {
					ecma: 5,
					warnings: false,
					comparisons: false,
					drop_console: true,
					inline: 2,
				},
				mangle: {
					safari10: true,
				},
				keep_classnames: false,
				keep_fnames: false,
				output: {
					ecma: 5,
					comments: false,
					ascii_only: true,
				},
			},
			sourceMap: useSourceMap,
		}),
		new OptimizeCSSAssetsPlugin({
			cssProcessorOptions: {
				parser: safePostCssParser,
				map: useSourceMap ?
					{
						inline: false,
						annotation: true,
					} :
					false,
			},
		}),
	],
	nodeEnv: enviroment,
	removeEmptyChunks: true,
	...splitChunk
});