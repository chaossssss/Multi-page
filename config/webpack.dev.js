const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src'
  },
  module: {
    rules:[
      {
       test: /\.css$/,
       use: [
         'style-loader',
         'css-loader'
       ]
      },
      {
       test: /\.less$/,
       use: [
         'style-loader',
         'css-loader',
         'less-loader'
       ]
      },
    ]
  },
  plugins: [
	new webpack.DefinePlugin({
      'process.env': config.env
    }),
	new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath:'',  //dev
  }
});