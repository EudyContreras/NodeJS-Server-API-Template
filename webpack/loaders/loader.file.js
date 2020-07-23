module.exports = (publicPath) => ({
	test: /\.(eot|otf|ttf|woff|woff2|json)$/,
	loader: 'file-loader',
	type: 'javascript/auto',
	options: {
		outputPath: publicPath,
		publicPath: publicPath,
		name() {
			return 'static/[ext]/[name].[ext]';
		}
	}
});
