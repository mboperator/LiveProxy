'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _chai = require('chai');

var _srcStore = require('../src/store');

var _srcStore2 = _interopRequireDefault(_srcStore);

var it = global.it;
var describe = global.describe;

describe('store', function () {
  it('is a Redux store configured with the correct reducer', function () {
    var store = (0, _srcStore2['default'])();
    (0, _chai.expect)(store.getState()).to.equal((0, _immutable.Map)());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    });

    (0, _chai.expect)(store.getState()).to.equal((0, _immutable.fromJS)({
      entries: ['Trainspotting', '28 Days Later']
    }));
  });
});