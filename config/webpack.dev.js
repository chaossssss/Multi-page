const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');
const webpack = require('webpack');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
	new webpack.DefinePlugin({
      'process.env': config.env
    }),
	new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
});