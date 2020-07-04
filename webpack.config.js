/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const clientConfigCSR = require('./webpack/configs/webpack.config.client.hot');

const configs = [clientConfigCSR];

module.exports = configs;
