/* eslint-disable @typescript-eslint/no-var-requires */

const imageUrlLoader = (path) => ({
	test: /\.(webp|png|jpg|jpe?g|gif)$/i,
	use: [{
		loader: 'url-loader',
		options: {
			limit: 8192,
			fallback: 'file-loader'
		}
	}]
});

module.exports = (path) => [
	imageUrlLoader(path)
];
