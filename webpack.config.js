const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    '@babel/polyfill', './src/server.ts'
  ],
  output: {
    path:     path.join(__dirname, './dist'),
    filename: 'server.js'
  },
  target: 'node',
  externals: [ nodeExternals() ],
  module: {
    rules: [
      { test: /\.(js|jsx|tsx|ts)$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
};