require('dotenv').config();

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

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
   
  ],
  output: {
    path: path.join(__dirname, '../../build/public'),
    filename: 'bundle.js',
    publicPath: "/",
    chunkFilename: '[id].[name].[chunkhash:6].js'
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
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 6,
    //   maxInitialRequests: 4,
    //   automaticNameDelimiter: '~',
    //   automaticNameMaxLength: 30,
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       // cacheGroupKey here is `commons` as the key of the cacheGroup
    //       name(module, chunks, cacheGroupKey) {
    //         const moduleFileName = module.identifier().split('/').reduceRight(item => item);
    //         const allChunksNames = chunks.map((item) => item.name).join('~');
    //         return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
    //       },
    //       chunks: 'all'
    //     },
    //     vendors: {
    //       reuseExistingChunk: true,
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
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
          publicPath: 'public/assets',
          // name: '[name].[ext]',
          name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[name].[ext]';
            }

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