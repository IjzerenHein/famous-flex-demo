/*global module, process*/
/*eslint no-use-before-define:0 */

var webpack = require('webpack');
var ReloadPlugin = require('webpack-reload-plugin');

// Support for extra commandline arguments
var argv = require('optimist')
            //--env=XXX: sets a global ENV variable (i.e. window.ENV='XXX')
            .alias('e','env').default('e','dev')
            //--minify:  minifies output
            .alias('m','minify')
            .argv;

var config = {
  entry: './src/main',
  output:{
    path: 'dist',
    filename: 'bundle.js',
    publicPath: './'
  },
  devServer: {
    publicPath: 'src/'
  },
  reload: isDevServer()? 'localhost': null,
  module:{
    loaders:[
      { test: /\.json$/,            loader: 'json-loader' },
      { test: /\.css$/,             loader: 'style-loader!css-loader' },
      { test: /\.less$/,            loader: 'style-loader!css-loader!less-loader' },
      { test: /\.(png|jpg|gif)$/,   loader: 'url-loader?limit=5000&name=[path][name].[ext]&context=./src' },
      { test: /\.eot$/,             loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /\.ttf$/,             loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /\.svg$/,             loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /\.woff$/,            loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /index\.html$/,       loader: 'file-loader?name=[path][name].[ext]&context=./src' }
    ]
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules'],
    alias: {
      'famous-flex': 'famous-flex/src',
      'famous-flex-layouts': 'famous-flex-layouts/src'
    }
  },
  copyContext: 'src',
  plugins:[
    new ReloadPlugin()
  ]
};

if (argv.minify) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({mangle:false}));
}

function isDevServer() {
  return process.argv.join('').indexOf('webpack-dev-server') > -1;
}

module.exports = config;
