'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = startServer;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _actionsResource = require('./actions/resource');

var resourceActions = _interopRequireWildcard(_actionsResource);

function startServer(app, store) {
  var io = _socketIo2['default'].listen(app);
  store.subscribe(function () {
    // Insert subscription logic
  });

  io.on('connection', function (socket) {
    // socket.emit('state', store.getState().toJS());
    socket.on('action', function (action) {

      // console.log('received', action);
      // store.dispatch(resourceActions[action.type]({...action}));
    });

    socket.on('error', function (error) {
      console.log('ERROR', error);
    });
  });
}

module.exports = exports['default'];