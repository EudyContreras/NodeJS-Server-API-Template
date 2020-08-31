
const textLoader = () => ({
	test: /\.txt$/i,
	use: [{
		loader: 'raw-loader',
		options: {
			esModule: false
		}
	}]
});

module.exports = () => [
	textLoader()
];
