/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-import')(),
		require('stylelint')()
	]
};
