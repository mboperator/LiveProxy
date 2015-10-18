'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  return function (next) {
    return function (action) {
      var promise = action.promise;
      var type = action.type;
      var payload = action.payload;

      if (!promise) {
        return next(action);
      }
      // CREATE_RESOURCE
      // TODO: Use ...rest
      next({
        type: type,
        meta: action.meta,
        id: action.id,
        payload: payload,
        readyState: 'request'
      });

      return promise.then(function (res) {
        //CREATE_RESOURCE_SUCCESS
        next({
          type: type + '_SUCCESS',
          meta: action.meta,
          payload: payload,
          result: res.data,
          readyState: 'success'
        });
      })['catch'](function (err) {
        //CREATE_RESOURCE_FAILURE
        next({
          type: type + '_FAILURE',
          meta: action.meta,
          payload: payload,
          result: err,
          readyState: 'failure'
        });
      });
    };
  };
};

module.exports = exports['default'];