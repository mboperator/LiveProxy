var webpack = require('webpack');
var devServer = require('webpack-dev-server');
var config = require('./webpack.hot.config');

var compiler = webpack(config);

var server = new devServer(compiler, {
    contentBase: 'http://localhost:8081',
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    watchDelay: 20,
    publicPath: 'http://localhost:8081/assets',
    stats: { colors: true },
});

server.listen(8081, 'localhost', function() {});
