/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const clientConfigHot = require('./webpack/configs/webpack.config.client.hot');
const clientConfig = require('./webpack/configs/webpack.config.client');
const serverConfig = require('./webpack/configs/webpack.config.server');

const configs = [];
if (process.env.REACT_HMR === 'true' && process.env.CSR === 'false') {
	configs.push(clientConfigHot);
} else if (process.env.REACT_HMR === 'true' && process.env.CSR === 'true') {
	configs.push(clientConfig);
} else{
	configs.push(clientConfig);
	configs.push(serverConfig);
}

module.exports = configs;
