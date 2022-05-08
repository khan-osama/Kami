require('dotenv/config');
const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server', 'public');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    clientPath,
    isDevelopment && 'webpack-hot-middleware/client?timeout=1000'
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: serverPublicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ],
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  stats: 'minimal',
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin([]),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new webpack.NoEmitOnErrorsPlugin()
  ].filter(Boolean)
};
