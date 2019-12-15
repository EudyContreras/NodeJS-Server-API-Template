

module.exports = {
	test: /\.(jpe?g|png|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 10 * 1024
	}
};