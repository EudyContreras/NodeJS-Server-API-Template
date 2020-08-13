const fontsLoader = () => ({
	test: /\.(eot|otf|ttf|woff|woff2)$/,
	loader: 'file-loader',
	type: 'javascript/auto',
	options: {
		outputPath: '/build/public',
		publicPath: '/build/public',
		name() {
			return 'fonts/[name].[ext]';
		}
	}
});

const videoLoader = () => ({
	test: /\.(mov|mp4)$/,
	use: [{
		loader: 'file-loader',
		options: {
			name() {
				return 'videos/[name].[ext]';
			}
		}  
	}]
});

const jsonLoader = () => ({
	test: /\.(json)$/,
	loader: 'file-loader',
	type: 'javascript/auto',
	options: {
		outputPath: '/build/public',
		publicPath: '/build/public',
		name() {
			return 'data/text/[name].[ext]';
		}
	}
});

module.exports = (publicPath) => [
	videoLoader(),
	fontsLoader(publicPath)
];
