'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var definition = {
  loading: false,
  name: 'stories',
  keys: {
    singular: 'story',
    plural: 'stories'
  },
  payloadFormatter: function payloadFormatter(story) {
    return {
      story: story
    };
  }
};

exports['default'] = definition;
module.exports = exports['default'];