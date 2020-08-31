/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const imageLoader = require('./loader.image');
const styleLoader = require('./loader.stylings');
const fileLoader = require('./loader.file');
const svgLoader = require('./loader.svgs');
const babelLoader = require('./loader.babel');
const htmlLoader = require('./loader.html');
const rawLoader = require('./loader.raw');

module.exports = (path, isProduction) => [
	...babelLoader(false),
	...htmlLoader(),
	...fileLoader('/'),
	...rawLoader(),
	...imageLoader('', 'images'),
	...styleLoader(path, isProduction),
	...svgLoader()
];
