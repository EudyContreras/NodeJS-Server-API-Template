module.exports = (path, isProduction) => [
	{
		test: /\.(css|scss)$/,
		use: [
			{ loader: 'isomorphic-style-loader' },
			{ loader: 'css-modules-typescript-loader' },
			{
				loader: 'css-loader',
				options: {
					modules: {
						mode: 'local',
						localIdentName: isProduction ? '[hash:base64]' : '[local]',
						context: path.resolve(__dirname, '../../src/client/components')
					},
					localsConvention: 'camelCase',
					importLoaders: 1
				}
			},
			{ loader: 'sass-loader' }
		]
	}
];