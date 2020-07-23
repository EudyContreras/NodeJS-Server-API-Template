/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const clientConfigHot = require('./webpack/configs/webpack.config.client.hot');
const clientConfig = require('./webpack/configs/webpack.config.client');
const serverConfig = require('./webpack/configs/webpack.config.server');

const configs = [];
if (process.env.REACT_HMR === 'true') {
	configs.push(clientConfigHot);
} else{
	configs.push(clientConfig);
	configs.push(serverConfig);
}

module.exports = configs;
