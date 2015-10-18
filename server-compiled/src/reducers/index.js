'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = reducer;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _resource = require('./resource');

var resource = _interopRequireWildcard(_resource);

var _asyncResource = require('./async-resource');

var asyncResource = _interopRequireWildcard(_asyncResource);

var reducers = _extends({}, resource, asyncResource);

function reducer(state, action) {
  var runReducer = reducers[action.type];
  if (runReducer) {
    return runReducer(state, action);
  }
  return state;
}

module.exports = exports['default'];