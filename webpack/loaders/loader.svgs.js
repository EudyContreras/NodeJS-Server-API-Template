/* eslint-disable @typescript-eslint/no-var-requires */
// const svgToMiniDataURI = require('mini-svg-data-uri');

// const svgUrlLoaderAlt = {
// 	test: /\.svg$/i,
// 	use: [{
// 		loader: 'url-loader',
// 		options: {
// 			limit: 8192,
// 			generator: (content) => svgToMiniDataURI(content.toString())
// 		}
// 	}]
// };

const svgUrlLoader = {
	test: /\.svg$/,
	loader: 'svg-url-loader',
	options: {
		limit: 10 * 1024,
		noquotes: true
	}
};

module.exports = () => [
	svgUrlLoader
];
