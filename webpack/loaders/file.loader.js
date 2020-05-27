module.exports = {
	test: /\.(ico)$/i,
	loader: 'file-loader',
	options: {
		outputPath: 'public/images',
		publicPath: 'public/images',
		name(file) {
			const parts = file.split('/');
			const isIcon = parts[parts.length - 1].startsWith('icon');

			if (process.env.NODE_ENV === 'development') {
				return isIcon ? 'icons/[name].[ext]' : '[name].[ext]';
			}
			return isIcon ? 'icons/[name].[ext]' : '[name].[ext]';
		}
	}
};