const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const minimize = process.argv.indexOf('--optimize-minimize') === -1;
const plugin = [];
let filename = 'rtmp.js';

if (minimize) {
  plugin.push(new UglifyJsPlugin({
    minimize: true,
    sourceMap: true,
  }));
  filename = 'rtmp.min.js';
}

module.exports = {
  entry: './index.js',
  devtool: minimize ? 'source-map' : '',
  externals: {
    clappr: 'clappr',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, './node_modules/compass-mixins/lib'),
                path.resolve(__dirname, './node_modules/clappr/src/base/scss'),
                path.resolve(__dirname, './src/base/scss'),
              ],
            },
          },
        ],
        include: [
          path.resolve(__dirname, './src'),
        ],
      },
      {
        test: /\.html/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
        ],
      },
    ],
  },
  plugins: plugin,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename,
    library: 'RTMP',
    libraryTarget: 'umd',
  },
};
