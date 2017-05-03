const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const minimize = process.argv.indexOf('--no-minimize') === -1;
const plugin = [];
let filename = 'rtmp.js';

if (minimize) {
  plugin.push(new UglifyJsPlugin({ minimize: true }));
  filename = 'rtmp.min.js';
}

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  devtool: minimize ? 'source-map' : '',
  externals: {
    clappr: 'clappr',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['css', `sass?includePaths[]=${
                   path.resolve(__dirname, './node_modules/compass-mixins/lib')
                   }&includePaths[]=${
                   path.resolve(__dirname, './node_modules/clappr/src/base/scss')
                   }&includePaths[]=${
                   path.resolve(__dirname, './src/base/scss')}`,
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.html/, loader: 'html?minimize=false',
      },
      {
        test: /\.(png|woff|eot|ttf|swf)/, loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: plugin,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename,
    library: 'RTMP',
    libraryTarget: 'umd',
  },
};
