module.exports = [{
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
},
{
	test: /\.(jpe?g|png)$/i,
	loader: 'responsive-loader',
	options: {
		name: 'icons/[name]-[width]x[width].[ext]',
		outputPath:'images',
		sizes: [16, 24, 32, 48, 52, 57, 64, 72, 76, 96, 120, 128, 144, 152, 168, 192, 256, 348, 512],
		placeholder: true,
		placeholderSize: 50,
		adapter: require('responsive-loader/sharp')
	}
}
];