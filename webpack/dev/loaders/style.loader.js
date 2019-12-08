module.exports = (path) => ({
	test: /\.(css|scss)$/,
	use: [
		'isomorphic-style-loader',
		{
			loader: 'css-loader',
			options: {
				modules: {
					mode: 'local',
					localIdentName: '[name]__[local]',
					context: path.resolve(__dirname, '../../src/client/components'),
				},
				localsConvention: 'camelCase',
				importLoaders: 1
			}
		},
		'sass-loader'
	]
});