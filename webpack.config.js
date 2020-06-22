/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const serverConfig = require('./webpack/configs/webpack.server.config');
const clientConfig = require('./webpack/configs/webpack.devserver.config');

module.exports = [
	clientConfig
];
