const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const node_modules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

// 创建多个实例
const extractCSS = new ExtractTextPlugin('css/[name]-css.css');
const extractSCSS = new ExtractTextPlugin('css/[name]-scss.css');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/app.js'),
    js: [path.resolve(__dirname, 'app/js/js.js')]
  },
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9091
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [node_modules],
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false
              }
            },
            'postcss-loader'
          ]
        })
      }, {
        test: /\.scss$/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false
              }
            },
            'sass-loader'
          ]
        })
      }, {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      }
    ],
    noParse: [pathToReact]
  },
  plugins: [
    extractCSS,
    extractSCSS,
    new HTMLWebpackPlugin({title: 'Code Splitting'})
  ]
};
