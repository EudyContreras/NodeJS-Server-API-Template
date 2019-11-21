const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'development',
  entry: [
    '@babel/polyfill', './src/server.ts'
  ],
  output: {
    path: path.join(__dirname, '../../build'),
    filename: 'server.js'
  },
  optimization: {
    minimize: false
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      { 
        test: /\.txt$/, 
        use: 'raw-loader' },
      { 
        test: /\.(js|jsx|tsx|ts)$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]',
                context: path.resolve(__dirname, '../../src/client/components'),
              },	
              localsConvention: 'camelCase',
              importLoaders: 1
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