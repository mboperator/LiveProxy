'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

exports['default'] = function (store, server) {
  // Hook in to express server
  var io = _socketIo2['default'].listen(server);

  store.subscribe(function () {
    io.emit('state', store.getState().toJS());
  });

  // Setup Socket
  io.on('connection', function (client) {

    // Setup Client Interactions
    client.on('action', function (action) {});

    client.on('error', function (error) {
      console.log('ERROR', error);
    });
  });
};

module.exports = exports['default'];