'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = startServer;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _actionsResource = require('./actions/resource');

var resourceActions = _interopRequireWildcard(_actionsResource);

function startServer(store) {
  var io = new _socketIo2['default']().attach(8090);

  store.subscribe(function () {
    io.emit('state', store.getState().toJS());
  });

  io.on('connection', function (socket) {
    socket.emit('state', store.getState().toJS());
    socket.on('action', function (action) {

      console.log('received', action);
      store.dispatch(resourceActions[action.type](_extends({}, action)));
    });

    socket.on('error', function (error) {
      console.log('ERROR', error);
    });
  });
}

module.exports = exports['default'];