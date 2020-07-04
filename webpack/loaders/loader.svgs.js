module.exports = {
	test: /\.svg$/,
	loader: 'svg-url-loader',
	options: {
		// Inline files smaller than 10 kB (10240 bytes)
		limit: 10 * 1024,
		// Remove the quotes from the url
		// (they’re unnecessary in most cases)
		noquotes: true
	}
};