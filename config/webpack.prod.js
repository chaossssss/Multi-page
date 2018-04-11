const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config/config.js')
module.exports = merge(common, {
  // devtool: config.sourceMap ? 'source-map' : '',
  plugins: [
    new UglifyJSPlugin()
  ]
});