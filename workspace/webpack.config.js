var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var files = ['index', 'antd'];
var entry = {};
var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('styles.css'),
  new webpack.ProvidePlugin({
    'React': 'react',
    'ReactDOM': 'react-dom'
  })
];
files.forEach(function(file) {
  entry[file] = './src/' + file + '/index.jsx';
  plugins.push(new HtmlWebpackPlugin({
    filename: file + '.html',
    template: 'src/common/template.html',
    chunks: [file]
  }));
});

var options = {
  cache: true,
  devtool: 'source-map',
  entry: entry,
  output: {
    path: './public/build',
    filename: '[name].js',
    publicPath: 'http://127.0.0.1:8080/build/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://127.0.0.1:8080/build/'
  },
  module: {
    loaders: [{
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!less')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
        loader: 'file'
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-1', 'react'],
          plugins: [['antd', {style: 'css'}]]
        }
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: plugins
};

module.exports = options;