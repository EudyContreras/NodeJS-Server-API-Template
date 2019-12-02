require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const manifest = require('../../src/client/resources/manifest.json');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-assets-manifest');
const CopyPlugin = require('copy-webpack-plugin');

const optimization = require('./sections/optimization');
const babelLoader = require('./loaders/babel.loader');
const styleLoader = require('./loaders/style.loader');
const fileLoader = require('./loaders/file.loader');

const enviroment = process.env.NODE_ENV;

module.exports = {
  name: 'client',
  target: 'web',
  mode: enviroment,
  entry: './src/client.jsx',
  performance: {
    hints: false
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin({
      assets: {
        ...manifest
      }
    }),
    new CopyPlugin([
      { from: 'src/client/resources/images', to: 'images' },
      { from: 'src/client/resources/images/icons', to: 'images/icons' },
    ]),
    new WorkboxPlugin.InjectManifest({
      swSrc: 'serviceWorker.js',
      swDest: 'serviceWorker.js'
    })
  ],
  output: {
    path: path.join(__dirname, '../../build/public'),
    publicPath: "/",
    // filename: 'main.js',
    // //filename: '[name].[contenthash:8].js',
    // chunkFilename: '[name].[chunkhash:8].js',
    globalObject: 'this',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  optimization: optimization(enviroment),
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
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.scss', '.css']
  },
};