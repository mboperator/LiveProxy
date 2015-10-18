'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _constantsResource = require('../constants/resource');

var _immutable = require('immutable');

function upsert(state, action) {
  var payload = action.payload;
  var def = action.meta.def;
  var id = payload.id;

  var resourceName = def.name;
  var map = (0, _immutable.fromJS)(payload);

  return state.updateIn(['collections', resourceName], (0, _immutable.Map)(), function (collection) {
    return collection.set(id, map);
  });
}

exports['default'] = (_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE = {}, _defineProperty(_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.CREATE_RESOURCE, function (state, action) {
  return upsert(state, action);
}), _defineProperty(_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.DESTROY_RESOURCE, function (state, action) {
  var id = action.id;
  var meta = action.meta;
  var def = meta.def;

  var resourceName = def.name;

  return state.updateIn(['collections', resourceName], (0, _immutable.Map)(), function (collection) {
    console.log('DESTROY collection', id);
    return collection['delete'](id);
  });
}), _defineProperty(_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.PATCH_RESOURCE, function (state, action) {
  return upsert(state, action);
}), _CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE);
module.exports = exports['default'];