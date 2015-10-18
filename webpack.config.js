var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname + '/client'),
  entry: {
    app: './src/index.jsx',
  },

  output: {
    path: './public/js',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loaders: ['babel-loader?stage=0'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!sass-loader?indentedSyntax',
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.sass'],
    modulesDirectories: [
      '_shared',
      'node_modules',
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
};
