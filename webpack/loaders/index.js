/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const imageLoader = require('./loader.image');
const styleLoader = require('./loader.stylings');
const fileLoader = require('./loader.file');
const svgLoader = require('./loader.svgs');

module.exports = (path, isProduction) => [
	{ test: /\.(jsx|tsx|ts|js)$/, exclude: /(node_modules)/, use: 'babel-loader' }, 
	{ test: /\.(mp4|webm)$/, use: 'url-loader' },
	{ test: /\.hbs$/, loader: 'handlebars-loader' },
	{ test: /\.html$/i, loader: 'html-loader' },
	fileLoader(''),
	...imageLoader('', 'images'),
	...styleLoader(path, isProduction),
	svgLoader
];
