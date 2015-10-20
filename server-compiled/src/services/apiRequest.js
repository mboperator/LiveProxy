'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.fetch = fetch;
exports.create = create;
exports.destroy = destroy;
exports.patch = patch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _reqwest = require('reqwest');

var _reqwest2 = _interopRequireDefault(_reqwest);

var BASE_URL = 'http://liveproxy-rails-example.herokuapp.com';
// const BASE_URL = 'http://localhost:8092';
var API_PATH = 'api/v1';

function pathForResource(def) {
  var path = BASE_URL + '/' + API_PATH + '/' + def.keys.plural;
  console.log('Hitting API', path);
  return path;
}

function fetch(action) {
  var deferred = _q2['default'].defer();
  var def = action.def;

  _axios2['default'].get(pathForResource(def)).then(function (res) {
    return deferred.resolve(res);
  })['catch'](function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
}

function create(action) {
  var deferred = _q2['default'].defer();
  var def = action.def;
  var _def$payloadFormatter = def.payloadFormatter;
  var payloadFormatter = _def$payloadFormatter === undefined ? function (doc) {
    return doc;
  } : _def$payloadFormatter;

  _axios2['default'].post(pathForResource(def), payloadFormatter(action.doc)).then(function (res) {
    return deferred.resolve(res);
  })['catch'](function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
}

function destroy(action) {
  var deferred = _q2['default'].defer();
  var id = action.id;
  var def = action.def;

  (0, _reqwest2['default'])({
    url: pathForResource(def) + '/' + id,
    type: 'json',
    method: 'delete',
    contentType: 'application/json',
    error: function error(err) {
      return deferred.reject(err);
    },
    success: function success(resp) {
      return deferred.resolve(resp);
    }
  });

  return deferred.promise;
}

function patch(action) {
  var deferred = _q2['default'].defer();
  var def = action.def;
  var doc = action.doc;

  _axios2['default'].patch(pathForResource(def) + '/' + doc.id, action.doc).then(function (res) {
    return deferred.resolve(res);
  })['catch'](function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
}