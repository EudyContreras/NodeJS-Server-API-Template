
const path = require('path');

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: './src/client.jsx',
  performance: {
    hints: false
  },
  output: {
    path: path.join(__dirname, '../../build/public'),
    filename: 'bundle.js',
    publicPath: "/",
    chunkFilename: '[id].[name].[chunkhash:6].js'
  },
  optimization: {
    minimize: false,
    nodeEnv: 'development',
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true
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
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
  },
};