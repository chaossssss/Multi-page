const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('../config/config.js');
module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{ loader: 'css-loader', options: { importLoaders: 1, minimize:false, sourceMap:config.sourceMap } },'postcss-loader'],
            	// publicPath:'../'
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{ loader: 'css-loader', options: { importLoaders: 1, minimize:false, sourceMap:config.sourceMap } },'postcss-loader','less-loader'],
            	// publicPath:'../'
            })
        }]
    },
    plugins: [
    	new ExtractTextPlugin("/css/[name].css"),
    	new OptimizeCssAssetsPlugin({
    	  assetNameRegExp: /\.optimize\.css$/g,
    	  cssProcessor: require('cssnano'),
    	  cssProcessorOptions: { discardComments: { removeAll: true } },
    	  canPrint: true
    	}),
    	new UglifyJSPlugin(), 
    ],
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',	//prod
    }
});