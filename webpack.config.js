/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const clientConfig = require('./webpack/configs/webpack.client.config');
const serverConfig = require('./webpack/configs/webpack.server.config');
const clientConfigCSR = require('./webpack/configs/webpack.devserver.config');

const usesCSR = process.env.CSR == 'true';

const configs = [];

if (usesCSR) {
	configs.push(clientConfigCSR);
} else {
	configs.push(clientConfig);
	configs.push(serverConfig);
}

module.exports = configs;
