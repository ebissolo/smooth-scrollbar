const ip = require('ip');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const joinRoot = path.join.bind(path, __dirname, '..');

module.exports = merge(baseConfig, {
  entry: [
    joinRoot('src/plugins/overscroll/index.ts'),
    joinRoot('src/index.ts')
  ],
  output: {
    path: joinRoot('dist/'),
    filename: 'smooth-scrollbar.d.js',
    library: 'Scrollbar',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      enforce: 'pre',
      use: [{
        loader: 'tslint-loader',
        options: {
          // type check is slow, see
          // https://github.com/wbuchwalter/tslint-loader/issues/76
          // typeCheck: true,
          formatter: 'stylish',
        },
      }],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }, {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => [ require('autoprefixer') ],
          },
        },
        'stylus-loader',
      ],
    }],
  },
});