const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function () {
return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.join(__dirname, 'dabao')
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src')
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        favicon: '',
        title: 'HtmlWebpackPluginSetTitle'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    // devtool: arguments[1].mode === 'production'? 'source-map': '',
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      watchContentBase: true,
      overlay: true,
      port: 8888,
      hot: true,
      // progress: true
    }
  }
}