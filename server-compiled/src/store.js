'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = configureStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _middlewareOptimisticMiddleware = require('./middleware/optimisticMiddleware');

var _middlewareOptimisticMiddleware2 = _interopRequireDefault(_middlewareOptimisticMiddleware);

var _middlewareStateLoggerMiddleware = require('./middleware/stateLoggerMiddleware');

var _middlewareStateLoggerMiddleware2 = _interopRequireDefault(_middlewareStateLoggerMiddleware);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _immutable = require('immutable');

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_middlewareOptimisticMiddleware2['default'], _middlewareStateLoggerMiddleware2['default'])(_redux.createStore);

function configureStore() {
  var initialState = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.Map)({ collections: (0, _immutable.Map)() }) : arguments[0];

  return createStoreWithMiddleware(_reducers2['default'], initialState);
}

;
module.exports = exports['default'];