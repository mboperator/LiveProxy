"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (store) {
  return function (next) {
    return function (action) {
      // console.log('Action in flight', action.type, action);
      return next(action);
    };
  };
};

module.exports = exports["default"];