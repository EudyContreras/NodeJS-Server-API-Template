require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const manifest = require('../../src/client/resources/manifest.json');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-assets-manifest');
const enviroment = process.env.NODE_ENV;
const minimize = false;

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
  optimization: {
    minimize: minimize,
    minimizer: [new TerserPlugin({
      test: /\.(js|jsx|tsx|ts)$/i,
      extractComments: false,
      chunkFilter: (chunk) => {
        if (chunk.name === 'vendor') {
          return false;
        }
        return true;
      },
      terserOptions: {
        ecma: 6,
        warnings: true,
        parse: {},
        compress: {},
        mangle: true,
        module: true,
        output: {
          comments: false,
        },
        toplevel: true,
        nameCache: null,
        ie8: false,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: false,
      },
    })],
    nodeEnv: enviroment,
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     chunks: 'all',
    //     maxInitialRequests: Infinity,
    //     minSize: 0,
    //     cacheGroups: {
    //       commons: {
    //         reuseExistingChunk: true,
    //         enforce: true,
    //         chunks: 'async',
    //         test: /[\\/]node_modules[\\/]/,
    //         // cacheGroupKey here is `commons` as the key of the cacheGroup
    //         name(module, chunks, cacheGroupKey) {
    //           const folder = 'common';
    //           const moduleFileName = module.identifier().split('/').reduceRight(item => item);
    //           const allChunksNames = chunks.map((item) => item.name).join('~');
    //           return `${folder}/${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
    //         },
    //         chunks: 'all'
    //       },
    //       vendor: {
    //         chunks: 'all',
    //         test: /[\\/]node_modules[\\/]/,
    //         name(module, chunks, cacheGroupKey) {
    //           const folder = 'vendor';
    //           // get the name. E.g. node_modules/packageName/not/this/part.js
    //           // or node_modules/packageName

    //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //           const allChunksNames = chunks.map((item) => item.name).join('~');
    //           // npm package names are URL-safe, but some servers don't like @ symbols
    //           return `${folder}/${cacheGroupKey}-${allChunksNames}-${packageName.replace('@', '')}`;
    //         },
    //       },
    //     },
    //   },
  },
  module: {
    rules: [{
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
        loader: 'file-loader',
        options: {
          outputPath: 'public/images',
          publicPath: 'images',
          name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[name].[ext]';
            }
            return '[name].[ext]';
            return '[contenthash].[ext]';
          },
        }
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