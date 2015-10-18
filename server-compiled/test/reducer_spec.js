'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _chai = require('chai');

var _srcReducer = require('../src/reducer');

var _srcReducer2 = _interopRequireDefault(_srcReducer);

var it = global.it;
var describe = global.describe;

describe('reducer', function () {
  it('has an initial state', function () {
    var action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    var nextState = (0, _srcReducer2['default'])(undefined, action);
    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      entries: ['Trainspotting']
    }));
  });

  it('handles SET_ENTRIES', function () {
    var initialState = (0, _immutable.Map)();
    var action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    var nextState = (0, _srcReducer2['default'])(initialState, action);

    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', function () {
    var initialState = (0, _immutable.fromJS)({
      entries: ['Trainspotting', '28 Days Later']
    });
    var action = { type: 'NEXT' };
    var nextState = (0, _srcReducer2['default'])(initialState, action);

    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }));
  });

  it('handles VOTE', function () {
    var initialState = (0, _immutable.fromJS)({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    });
    var action = { type: 'VOTE', entry: 'Trainspotting' };
    var nextState = (0, _srcReducer2['default'])(initialState, action);

    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { Trainspotting: 1 }
      },
      entries: []
    }));
  });

  it('can be used with reduce', function () {
    var actions = [{ type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later'] }, { type: 'NEXT' }, { type: 'VOTE', entry: 'Trainspotting' }, { type: 'VOTE', entry: '28 Days Later' }, { type: 'VOTE', entry: 'Trainspotting' }, { type: 'NEXT' }];
    var finalState = actions.reduce(_srcReducer2['default'], (0, _immutable.Map)());

    (0, _chai.expect)(finalState).to.equal((0, _immutable.fromJS)({
      winner: 'Trainspotting'
    }));
  });
});