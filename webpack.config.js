/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const clientConfigCSR = require('./webpack/configs/webpack.devserver.config');

const configs = [clientConfigCSR];

module.exports = configs;
