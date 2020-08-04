
const fileLoader = (public = 'public', path) => ({
	test: /\.(gif|svg|ico)$/,
	loader: 'file-loader',
	options: {
		outputPath: path,
		publicPath: public,
		name(file) {
			const parts = file.split('/');
			const isIcon = parts[parts.length - 1].startsWith('icon');

			if (process.env.NODE_ENV === 'development') {
				return isIcon ? '[name].[ext]' : '[name].[ext]';
			}
			return isIcon ? '[name].[ext]' : '[name].[ext]';
		}
	}	
});

const responsiveLoader = (path) => ({
	test: /\.(jpe?g|png|webp)$/i,
	loader: 'responsive-loader',
	options: {
		name: '[name]/[name]_[width]x[width].[ext]',
		outputPath: path,
		size: 2200,
		esModule: true,
		quality: 85,
		placeholder: true,
		placeholderSize: 30,
		adapter: require('responsive-loader/sharp')
	}
});

const imageLoader = () => ({
	test: /\.(jpe?g|png|gif|svg|ico)$/,
	loader: 'image-webpack-loader',
	enforce: 'pre',
	options: {
		mozjpeg: {
			progressive: true,
			quality: 100
		},
		optipng: {
			enabled: true
		},
		pngquant: {
			quality: [0.75, 1.0],
			speed: 4
		},
		gifsicle: {
			interlaced: false
		},
		webp: {
			quality: 90
		}
	}
});

module.exports = (public, path) => [
	responsiveLoader(path),
	fileLoader(public, path),
	imageLoader()
];
