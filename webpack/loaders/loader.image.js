
module.exports = (path, useResponsive) => [{
	test: /\.(jpe?g|png|svg|ico)$/,
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
},
useResponsive ? {
	test: /\.(jpe?g|png)$/i,
	loader: 'responsive-loader',
	options: {
		name: 'icons/[name]-[width]x[width].[ext]',
		outputPath: path,
		sizes: [30, 76, 96, 128, 144, 152, 192, 257, 384, 512],
		placeholder: true,
		placeholderSize: 50,
		adapter: require('responsive-loader/sharp')
	}
} : {
	test: /\.(jpe?g|png)$/,
	loader: 'url-loader',
	options: {
		limit: 10 * 1024
	}
},
{
	test: /\.(jpe?g|png|ico)$/i,
	loader: 'file-loader',
	options: {
		outputPath: path,
		publicPath: path,
		name(file) {
			const parts = file.split('/');
			const isIcon = parts[parts.length - 1].startsWith('icon');

			if (process.env.NODE_ENV === 'development') {
				return isIcon ? 'icons/[name].[ext]' : '[name].[ext]';
			}
			return isIcon ? 'icons/[name].[ext]' : '[name].[ext]';
		}
	}
}];
