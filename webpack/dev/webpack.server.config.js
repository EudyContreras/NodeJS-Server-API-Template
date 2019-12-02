require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');

const optimization = require('./sections/optimization');
const babelLoader = require('./loaders/babel.loader');
const styleLoader = require('./loaders/style.loader');
const fileLoader = require('./loaders/file.loader');

const enviroment = process.env.NODE_ENV;

module.exports = {
  name: 'server',
  target: 'node',
  mode: enviroment,
  performance: {
    hints: false
  },
  entry: [
    '@babel/polyfill', './src/server.ts'
  ],
  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'server.js',
    globalObject: 'this'
  },
  plugins: [

  ],
  optimization: optimization(enviroment),
  externals: [NodeExternals()],
  module: {
    rules: [{
        test: /\.txt$/,
        use: 'raw-loader'
      },
      babelLoader,
      fileLoader,
      styleLoader(path)
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
  },
};