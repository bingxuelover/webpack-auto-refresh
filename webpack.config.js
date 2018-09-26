const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const node_modules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
  entry: {
    main: [path.resolve(__dirname, 'app/app.js')],
    js: [path.resolve(__dirname, 'app/js/js.js')]
  },
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9090
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [node_modules],
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.(png|jpg)$/,
        use: ['url-loader?limit=8192']
      }
    ],
    noParse: [pathToReact]
  },
  plugins: [new HtmlWebpackPlugin({title: 'webpack demo dev', filename: "index.html"})]
};
