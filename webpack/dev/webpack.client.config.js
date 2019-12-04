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

const splitChunk = {
  // runtimeChunk: 'single',
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor/vendor",
        chunks: "all"
      }
    }
    // chunks: 'all',
    // maxInitialRequests: Infinity,
    // minSize: 0,
    // cacheGroups: {
    //   commons: {
    //     reuseExistingChunk: true,
    //     enforce: true,
    //     chunks: 'async',
    //     test: /[\\/]node_modules[\\/]/,
    //     // cacheGroupKey here is `commons` as the key of the cacheGroup
    //     name(module, chunks, cacheGroupKey) {
    //       const folder = 'common';
    //       const moduleFileName = module.identifier().split('/').reduceRight(item => item);
    //       const allChunksNames = chunks.map((item) => item.name).join('~');
    //       return `${folder}/${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
    //     },
    //     chunks: 'all'
    //   },
    //   vendor: {
    //     chunks: 'all',
    //     test: /[\\/]node_modules[\\/]/,
    //     name(module, chunks, cacheGroupKey) {
    //       const folder = 'vendor';
    //       // get the name. E.g. node_modules/packageName/not/this/part.js
    //       // or node_modules/packageName

    //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //       const allChunksNames = chunks.map((item) => item.name).join('~');
    //       // npm package names are URL-safe, but some servers don't like @ symbols
    //       return `${folder}/${cacheGroupKey}-${allChunksNames}-${packageName.replace('@', '')}`;
    //     },
    //   },
    // },
  }
}

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
    new CopyPlugin([{
        from: 'src/client/resources/robots.txt',
        to: ''
      },
      {
        from: 'src/client/resources/images',
        to: 'images'
      },
      {
        from: 'src/client/resources/images/icons',
        to: 'images/icons'
      },
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
  optimization: optimization(enviroment, splitChunk),
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