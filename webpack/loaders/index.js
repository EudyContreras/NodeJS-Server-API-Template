/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const imageLoader = require('./loader.image');
const styleLoader = require('./loader.stylings');
const svgLoader = require('./loader.svgs');

module.exports = (path, isProduction) => [
	{ test: /\.(jsx|tsx|ts|js)$/, exclude: /(node_modules)/, use: 'babel-loader' }, 
	{ test: /\.(mp4|webm)$/, use: 'url-loader' },
	{ test: /\.(eot|otf|ttf|woff|woff2)$/, use: 'file-loader' },
	{ test: /\.hbs$/, loader: 'handlebars-loader' },
	{ test: /\.txt$/, use: 'raw-loader' },
	{ test: /\.html$/i, loader: 'html-loader' },
	...imageLoader('images', true),
	...styleLoader(path, isProduction),
	svgLoader
];