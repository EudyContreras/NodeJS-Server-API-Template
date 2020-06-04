
module.exports = {
	test: /\.(jpe?g|png)$/,
	loader: 'url-loader',
	options: {
		limit: 10 * 1024
	}
};