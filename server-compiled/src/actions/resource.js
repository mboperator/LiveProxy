'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _servicesApiRequest = require('../services/apiRequest');

var apiRequest = _interopRequireWildcard(_servicesApiRequest);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _constantsResource = require('../constants/resource');

exports['default'] = (_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE = {}, _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.FETCH_RESOURCE, function (req) {
  return {
    type: _constantsResource.FETCH_RESOURCE,
    meta: {
      def: req.def
    },
    payload: null,
    promise: apiRequest.fetch(req)
  };
}), _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.CREATE_RESOURCE, function (req) {
  if (!req.doc.id) {
    req.doc.id = _uuid2['default'].v4();
  }

  return {
    type: _constantsResource.CREATE_RESOURCE,
    meta: {
      def: req.def
    },
    payload: req.doc,
    promise: apiRequest.create(req)
  };
}), _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.DESTROY_RESOURCE, function (req) {
  return {
    type: _constantsResource.DESTROY_RESOURCE,
    meta: {
      def: req.def
    },
    id: req.id,
    promise: apiRequest.destroy(req)
  };
}), _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.PATCH_RESOURCE, function (req) {
  return {
    type: _constantsResource.PATCH_RESOURCE,
    meta: {
      def: req.def
    },
    payload: req.doc,
    promise: apiRequest.patch(req)
  };
}), _FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE);
module.exports = exports['default'];