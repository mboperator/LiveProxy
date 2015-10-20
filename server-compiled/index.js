'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _srcStore = require('./src/store');

var _srcStore2 = _interopRequireDefault(_srcStore);

var _srcSocket = require('./src/socket');

var _srcSocket2 = _interopRequireDefault(_srcSocket);

var _jsonServer = require('json-server');

var _jsonServer2 = _interopRequireDefault(_jsonServer);

var _srcServicesRoutesJs = require('./src/services/routes.js');

var _srcServicesRoutesJs2 = _interopRequireDefault(_srcServicesRoutesJs);

var _srcActionsResource = require('./src/actions/resource');

var resourceActions = _interopRequireWildcard(_srcActionsResource);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _definitionsStory = require('./definitions/story');

var _definitionsStory2 = _interopRequireDefault(_definitionsStory);

var _definitionsSentence = require('./definitions/sentence');

var _definitionsSentence2 = _interopRequireDefault(_definitionsSentence);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

function setupRoutes(app) {
  var jsonApi = _jsonServer2['default'].router(require('./db.json'));

  app.use('/api/v1', (0, _srcServicesRoutesJs2['default'])(_srcStore2['default']));
  app.use('/api/mock', jsonApi);
  app.get('/', function (req, res) {
    res.sendFile(_path2['default'].join(__dirname, '../', 'client') + '/index.html');
  });

  return app;
}

function setupMiddleware(app) {
  app.use(_jsonServer2['default'].defaults);
  app.use(_bodyParser2['default'].json());
  return app;
}

function initScripts(app) {
  _srcStore2['default'].dispatch(resourceActions['FETCH_RESOURCE']({ def: _definitionsStory2['default'] }));
  _srcStore2['default'].dispatch(resourceActions['FETCH_RESOURCE']({ def: _definitionsSentence2['default'] }));
  return app;
}

function startServer(app) {
  var server = _http2['default'].createServer(app);
  // Start Socket
  (0, _srcSocket2['default'])(_srcStore2['default'], server);
  server.listen(process.env.PORT || 8091);
}

exports['default'] = function () {
  console.log('Booting server');
  var app = _jsonServer2['default'].create();

  (0, _ramda.compose)(startServer, initScripts, setupMiddleware, setupRoutes)(app);
};

module.exports = exports['default'];