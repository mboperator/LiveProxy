'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcStore = require('./src/store');

var _srcStore2 = _interopRequireDefault(_srcStore);

var _srcServer = require('./src/server');

var _srcServer2 = _interopRequireDefault(_srcServer);

var _jsonServer = require('json-server');

var _jsonServer2 = _interopRequireDefault(_jsonServer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _srcActionsResource = require('./src/actions/resource');

var resourceActions = _interopRequireWildcard(_srcActionsResource);

var _definitionsStory = require('./definitions/story');

var _definitionsStory2 = _interopRequireDefault(_definitionsStory);

var _definitionsSentence = require('./definitions/sentence');

var _definitionsSentence2 = _interopRequireDefault(_definitionsSentence);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

exports['default'] = function () {
  var apiServer = _jsonServer2['default'].create();
  var router = _jsonServer2['default'].router(require('./db.json'));

  apiServer.get('/', function (req, res) {
    res.sendFile(_path2['default'].join(__dirname, '../', 'client') + '/index.html');
  });

  apiServer.use('/api/mock', router);
  apiServer.use(_jsonServer2['default'].defaults);
  apiServer.listen(8091);

  var store = (0, _srcStore2['default'])();
  (0, _srcServer2['default'])(store);
  store.dispatch(resourceActions['FETCH_RESOURCE']({ def: _definitionsStory2['default'] }));
  store.dispatch(resourceActions['FETCH_RESOURCE']({ def: _definitionsSentence2['default'] }));
};

module.exports = exports['default'];