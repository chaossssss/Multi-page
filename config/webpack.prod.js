const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config/config.js')
module.exports = merge(common, {
  // devtool: config.sourceMap ? 'source-map' : '',
 	// output: {
 	// 	filename: 'js/[name].js',
 	// 	publicPath: config.env.mode === '"production"' ? '/dist/' : ''
 	// },
 // module: {
 // 	rules: [{
 // 		test: /\.less/,
 // 		use: ExtractTextPlugin.extract({
 // 			fallback: 'style-loader',
 // 			use: [{
 // 				loader: 'css-loader',
 // 				use: [{ loader: 'css-loader', options: { importLoaders: 1, minimize:true, sourceMap:config.sourceMap } },'postcss-loader','less-loader'],
 // 				publicPath:'../'
 // 			}]
 // 		})
 // 	}]
 // },
 plugins: [
   // new ExtractTextPlugin("./css/[name].css"),
   new UglifyJSPlugin()
 ]
});