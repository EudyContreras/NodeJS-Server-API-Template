const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'production',
  entry: [
    '@babel/polyfill', './src/server.ts'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'server.js'
  },
  optimization: {
    minimize: false
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
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