'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var definition = {
  loading: false,
  name: 'sentences',
  keys: {
    singular: 'sentence',
    plural: 'sentences'
  },
  payloadFormatter: function payloadFormatter(sentence) {
    var story_id = sentence.story_id;

    var rest = _objectWithoutProperties(sentence, ['story_id']);

    return {
      sentence: rest,
      story_id: story_id
    };
  }
};

exports['default'] = definition;
module.exports = exports['default'];