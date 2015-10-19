'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _constantsAsyncResource = require('../constants/async-resource');

var _immutable = require('immutable');

exports['default'] = (_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS = {}, _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.CREATE_RESOURCE_SUCCESS, function (state, action) {
  var result = action.result;
  var meta = action.meta;
  var payload = action.payload;
  var def = meta.def;

  var resourceName = def.name;
  var oldId = payload.id;
  var newId = result.id;

  return state.updateIn(['collections', resourceName], (0, _immutable.Map)(), function (collection) {
    return collection.mapKeys(function (key) {
      if (key === oldId) {
        return newId;
      }
      return key;
    });
  });
}), _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.DESTROY_RESOURCE_SUCCESS, function (state, action) {
  return state;
}), _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.PATCH_RESOURCE_SUCCESS, function (state, action) {
  return state;
}), _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.FETCH_RESOURCE_SUCCESS, function (state, _ref) {
  var payload = _ref.result;
  var meta = _ref.meta;
  var def = meta.def;

  var result = payload[def.keys.plural];
  var resourceName = def.name;

  var updates = result.reduce(function (memo, object) {
    return memo.set(object.id, object);
  }, (0, _immutable.Map)());

  return state.setIn(['collections', resourceName], updates);
}), _CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS);
module.exports = exports['default'];