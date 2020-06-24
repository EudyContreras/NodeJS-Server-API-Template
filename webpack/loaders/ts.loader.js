module.exports = {
	test: /\.(ts|tsx|jsx|js)$/,
	use: [
		{
			loader: 'ts-loader',
			options: {
				transpileOnly: true
			}
		}
	],
	exclude: /node_modules/
};