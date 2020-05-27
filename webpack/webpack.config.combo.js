/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();

const serverConfig = require('./webpack.server.config');
const clientConfig = require('./webpack.client.config');

module.exports = [
	serverConfig,
	clientConfig
];
