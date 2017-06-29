const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer-loader');

module.exports = {
  entry: path.resolve(__dirname, 'js', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devtool: '#eval',
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.css',
      '.sass',
    ],
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        use: ['json-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourcemap: false,
    })
  ],
}
