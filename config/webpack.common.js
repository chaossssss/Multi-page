const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config.js')
const webpack = require('webpack');
// const DashboardPlugin = require('webpack-dashboard/plugin');

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
      test: /\.html$/,
      use: ['html-withimg-loader']
    },
  	{
  		test: /\.(jpg|png|svg|gif)$/,
  		use: [{
  			loader: 'url-loader',
        loader: 'file-loader',
  			options: {
  				limit : 8,
  				name: 'images/[name].[ext]',
          // publicPath: '/dist',
          // name: 'images/[name][hash:4].[ext]', //用hash命名
	  			}
  			}],
  		// include: [resolve('src')]
  	},
  	{
  		test:/\.(woff|woff2|eot|ttf|otf)/,
  		use: [{
  			loader: 'file-loader',
  			options: {
				name: 'font/[name].[ext]',
        // publicPath: '../../',
			}
		}],
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
    // new DashboardPlugin(),
    new CleanWebpackPlugin(['dist'],{
    	root: path.resolve(__dirname, '../')
    }),
  ],
};