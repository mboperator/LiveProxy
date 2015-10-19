'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = startServer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

function startServer(app, store) {
  var io = _socketIo2['default'].listen(app);
  store.subscribe(function () {
    io.emit('state', store.getState().toJS());
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