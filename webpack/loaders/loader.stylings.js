/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = (path, isProduction) => [
	{
		test: /\.(c|le|sa|sc)ss$/,
		use: [
			{ loader: 'isomorphic-style-loader' },
			{ loader: 'css-modules-typescript-loader' },
			{
				loader: 'css-loader',
				options: {
					modules: {
						mode: 'local',
						localIdentName: isProduction ? '[hash:base64:10]' : '[name]-[local]-[hash:base64:5]',
						context: path.resolve(__dirname, '../../src/client/components')
					},
					localsConvention: 'camelCaseOnly',
					importLoaders: 1
				}
			},
			{
				loader: 'less-loader',
				options: {
					sourceMap: !isProduction,
					lessOptions: {
						strictMath: true
						
					}
				}
			},
			{ 
				loader: 'sass-loader',
				options: {
					sourceMap: !isProduction,
					sassOptions: {
						outputStyle: 'compressed'
					}
				}
			}
		]
	}
];
