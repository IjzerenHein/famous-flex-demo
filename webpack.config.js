/*global module, process, __dirname*/

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function isDevServer() {
  return process.argv.join('').indexOf('webpack-dev-server') > -1;
}

var pathPrefix = isDevServer() ? '' : '/';

var entries = {};
entries.bundle = './main';
entries['examples/bundle'] = './examples';

var config = {
  context: path.join(__dirname, 'src'),
  entry: entries,
  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].js',
    publicPath: isDevServer() ? '/' : ''
  },
  devServer: {
    publicPath: '/'
  },
  reload: isDevServer() ? 'localhost' : null,
  module: {
    loaders: [
      { test: /\.js$/,              loader: 'babel?presets[]=es2015', exclude: /(node_modules\/ismobile)/ },
      { test: /\.glsl$/,            loader: 'raw-loader' },
      { test: /\.glsl$/,            loader: 'glslify-loader' },
      { test: /\.json$/,            loader: 'file-loader?name=' + pathPrefix + '[path][name].[ext]&context=.' },
      { test: /\.css$/,             loader: 'style-loader!css-loader' },
      { test: /\.less$/,            loader: 'style-loader!css-loader!less-loader' },
      { test: /\.handlebars$/,      loader: 'handlebars-loader' },
      { test: /\.(png|jpg|gif)$/,   loader: 'url-loader?limit=10&name=' + pathPrefix + '[path][name].[ext]&context=.' },
      { test: /\.(ico)$/,           loader: 'url-loader?limit=1&name=' + pathPrefix + '[path][name].[ext]&context=.' },
      { test: /index\.html$/,       loader: 'file-loader?name=[path][name].[ext]&context=./src' },
    ]
  },
  resolve: {
    root: __dirname,
    alias: {
      famous: 'node_modules/famous'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(require('./package.json').version)
    }),
    new HtmlWebpackPlugin({
      filename: 'examples/index.html',
      template: 'examples/out/index.html'
    })
  ]
};

module.exports = config;
