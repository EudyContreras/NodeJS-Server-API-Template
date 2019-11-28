
const path = require('path');

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: './src/client.jsx',
  output: {
    path: path.join(__dirname, '../../public'),
    filename: 'client.js',
    publicPath: "/",
    chunkFilename: '[id].[name].[chunkhash:8].js'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      { 
        test: /\.txt$/, 
        use: 'raw-loader'
       },
      { 
        test: /\.(js|jsx|tsx|ts)$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },
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
                mode: 'global',
                localIdentName: '[hash:base64:5]'
              },
              localsConvention: 'camelCase',
              importLoaders: 1,
              sourceMap: true,
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