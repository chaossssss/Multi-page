const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js')
const webpack = require('webpack');

const entrys = config.pages.reduce((sum,page)=>{
	sum[page] = `${config.rootPath}/js/${page}.js`;
	return sum;
},{})

const HtmlWebpackPlugins = config.pages.map(page=>{
	return new HtmlWebpackPlugin({
		title: config.env.mode === '"production"' ? '@Html.Action("SeoModel","PartialView",new { name = "seoIndex", id = 0})' : `<title>${page}</title>`,
		template: `${config.rootPath}/pages/${page}.ejs`,
		filename: config.env.mode === '"production"' ? page+'.cshtml' : page+'.html',
		inject: false,
		chunks: [page]
	})
})
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  entry: entrys,
  module: {
  	rules:[{
	  	test: /\.ejs$/,
	  	use: ['jcy-loader']
  	},
  	{
  		test: /\.(jpg|png|svg|gif)$/,
  		use: [{
  			loader: 'url-loader',
  			options: {
  				limit : 8,
  				name: '/images/[name].[ext]'
	  			}
  			}],
  		include: [resolve('src')]
  	},
  	{
  		test:/\.(woff|woff2|eot|ttf|otf)/,
  		use: [{
  			loader: 'file-loader',
  			options: {
				name: '/font/[name].[ext]'
			}
		}],
  	},
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
  	{
  		test: require.resolve('jquery'),
  		use: [{
  			loader: 'expose-loader',
  			options: '$'
  		}]
  	}]
  },
  resolve: {
  	extensions: ['.js','ejs'],
  	alias: {
  		'C': './'
  	}
  },
  plugins: [
  	new webpack.ProvidePlugin({
  	  $: 'jquery',
  	  jQuery: 'jquery',
  	  'window.jQuery': 'jquery',
  	  'window.$': 'jquery',
  	}),
    ...HtmlWebpackPlugins,
    new CleanWebpackPlugin(['dist']),
  ],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath:''
  }

};