const path = require('path');
const webpack = require('webpack');

const minimize = process.argv.indexOf('--optimize-minimize') === -1;
const plugin = [];
let filename = 'rtmp.js';

if (minimize) {
  plugin.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    sourceMap: true,
  }));
  filename = 'rtmp.min.js';
}

module.exports = {
  entry: './index.js',
  devtool: minimize ? 'source-map' : '',
  externals: {
    clappr: 'Clappr',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: false,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
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
          path.resolve(__dirname, 'src'),
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
      {
        test: /\.(png|woff|eot|ttf|swf)/,
        use: [
          {
            loader: 'file-loader',
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
