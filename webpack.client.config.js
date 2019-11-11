
const path = require('path');

module.exports = {
  entry: './src/client.jsx',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'client.js',
    publicPath: "/",
    chunkFilename: '[id].[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx|tsx|ts)$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
};