
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
      { test: /\.(js|jsx|tsx|ts)$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
  },
};