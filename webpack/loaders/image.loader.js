module.exports = {
	test: /\.(jpe?g|png|gif|svg)$/,
	loader: 'image-webpack-loader',
	// This will apply the loader before the other ones
	enforce: 'pre'
};