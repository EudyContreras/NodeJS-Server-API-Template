require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const optimization = require('./sections/optimization');
const babelLoader = require('./loaders/babel.loader');
const styleLoader = require('./loaders/style.loader');
const fileLoader = require('./loaders/file.loader');

const enviroment = process.env.NODE_ENV;

const publicPath = '../../build/public/';
const useSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const isEnvProduction = enviroment === 'production';
const isEnvDevelopment = enviroment === 'development';
const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : isEnvDevelopment && '';

const entryPoint = './src/client.jsx';

const resources = [{
  from: 'src/client/resources/manifest.json',
  to: ''
}, {
  from: 'src/client/resources/robots.txt',
  to: ''
}, {
  from: 'src/client/resources/images',
  to: 'static/images'
}, {
  from: 'src/client/resources/images/icons',
  to: 'static/images/icons'
}];

const singleShunk = {
  cacheGroups: {
    commons: {
      test: /[\\/]node_modules[\\/]/,
      name: "vendor/vendor",
      chunks: "all"
    }
  }
}

const multiChunk = {
  chunks: 'all',
  maxInitialRequests: Infinity,
  minSize: 0,
  cacheGroups: {
    commons: {
      reuseExistingChunk: true,
      enforce: true,
      chunks: 'async',
      test: /[\\/]node_modules[\\/]/,
      name(module, chunks, cacheGroupKey) {
        const folder = 'common';
        const moduleFileName = module.identifier().split('/').reduceRight(item => item);
        const allChunksNames = chunks.map((item) => item.name).join('~');
        return `${folder}/${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
      },
      chunks: 'all'
    },
    vendor: {
      chunks: 'all',
      test: /[\\/]node_modules[\\/]/,
      name(module, chunks, cacheGroupKey) {

        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
        const allChunksNames = chunks.map((item) => item.name).join('~');
        return `${folder}/${cacheGroupKey}-${allChunksNames}-${packageName.replace('@', '')}`;
      },
    },
  },
}

const splitChunk = {
  splitChunks: {
    ...singleShunk
  }
}

module.exports = {
  name: 'client',
  target: 'web',
  mode: enviroment,
  bail: isEnvProduction,
  entry: entryPoint,
  performance: {
    hints: false
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest-assets.json',
      publicPath: publicPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
    new CopyPlugin(resources),
    new WorkboxPlugin.InjectManifest({
      swSrc: 'serviceWorker.js',
      swDest: 'service-worker.js',
      precacheManifestFilename: 'manifest-precache.[manifestHash].js'
    })
  ],
  output: {
    path: path.join(__dirname, publicPath),
    futureEmitAssets: true,
    pathinfo: isEnvDevelopment,
    filename: 'static/scripts/bundle.js',
    chunkFilename: 'static/scripts/[name].chunk.js',
    publicPath: '/',
    globalObject: 'this'
  },
  optimization: optimization(enviroment, splitChunk, useSourceMap),
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