var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname + '/client'),
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      './src/index.jsx',
    ],
  },

  output: {
    path: './public/build',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/',
  },

  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/build/',
  },

  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loaders: ['react-hot', 'babel-loader?stage=0'],
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
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  debug: true,

  devtool: 'eval-source-map',
};
