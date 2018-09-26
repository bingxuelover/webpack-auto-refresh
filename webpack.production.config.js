const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const node_modules = path.resolve(__dirname, 'node_modules');

//css和sass文件合并成一个css，不想合并，可以分别使用extractCSS、extractSASS
const extractCSS = new ExtractTextPlugin('css/css.css');
const extractSASS = new ExtractTextPlugin('css/scss.css');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/app.js'),
    js: [path.resolve(__dirname, 'app/js/js.js')]
    // 当 React 作为一个 node 模块安装的时候，
    // 我们可以直接指向它，就比如 require('react')
    // vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [node_modules],
        use: ['babel-loader']
      }, {
        test: /\.css$/, // Only .css files
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js'
                }
              }
            }
          ]
        })
      }, {
        test: /\.scss$/,
        use: extractSASS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            "sass-loader"
          ]
        })
      }, {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              outputPath: path.resolve(__dirname, 'public/images/')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractCSS, extractSASS,
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({title: 'webpack demo production', filename: "home.html"})
  ]
};
