
const fileLoader = (path) => ({
	test: /\.(jpe?g|png|gif|svg|ico)$/,
	loader: 'file-loader',
	options: {
		outputPath: path,
		publicPath: 'public',
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
	test: /\.(jpe?g|png)$/i,
	loader: 'responsive-loader',
	options: {
		name: '[name]/[name]_[width]x[width].[ext]',
		outputPath: path,
		quality: 85,
		placeholder: true,
		placeholderSize: 40,
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

const lqipLoader = () => ({
	test: /\.(jpe?g|png)$/,
	loader: 'lqip-loader',
	options: {
	  path: '/media', // your image going to be in media folder in the output dir
	  name: '[name].[ext]', // you can use [hash].[ext] too if you wish,
	  base64: false, // default: true, gives the base64 encoded image
	  palette: true // default: false, gives the dominant colours palette
	}
});

module.exports = (path, useResponsive) => [
	lqipLoader(),
	responsiveLoader(path),
	fileLoader(path),
	imageLoader()
];
