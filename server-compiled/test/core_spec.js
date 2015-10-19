'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

var _srcCore = require('../src/core');

var describe = global.describe;
var it = global.it;

var nextStateList = _immutable.List.of('Trainspotting', '28 Days Later', 'Sunshine');

var prevStateList = _immutable.List.of('Trainspotting', '28 Days Later');

describe('application logic', function () {
  describe('setEntries', function () {
    it('adds the entires to the state', function () {
      var state = (0, _immutable.Map)();
      var entries = prevStateList;
      var nextState = (0, _srcCore.setEntries)(state, entries);

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        entries: prevStateList
      }));
    });

    it('converts to immutable', function () {
      var state = (0, _immutable.Map)();
      var entries = ['Trainspotting', '28 Days Later'];
      var nextState = (0, _srcCore.setEntries)(state, entries);

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        entries: prevStateList
      }));
    });
  });

  describe('next', function () {
    it('takes the next two entires under vote', function () {
      var state = (0, _immutable.Map)({
        entries: nextStateList
      });
      var nextState = (0, _srcCore.next)(state);

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: prevStateList
        }),
        entries: _immutable.List.of('Sunshine')
      }));
    });

    it('puts winner of current vote back to entries', function () {
      var state = (0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Trainspotting', '28 Days Later'),
          tally: (0, _immutable.Map)({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: _immutable.List.of('Sunshine', 'Millions', '127 Hours')
      });
      var nextState = (0, _srcCore.next)(state);
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Sunshine', 'Millions')
        }),
        entries: _immutable.List.of('127 Hours', 'Trainspotting')
      }));
    });

    it('puts both from tied vote back to entries', function () {
      var state = (0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Trainspotting', '28 Days Later'),
          tally: (0, _immutable.Map)({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: _immutable.List.of('Sunshine', 'Millions', '127 Hours')
      });
      var nextState = (0, _srcCore.next)(state);
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Sunshine', 'Millions')
        }),
        entries: _immutable.List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));
    });

    it('marks winner when just one entry left', function () {
      var state = (0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Trainspotting', '28 Days Later'),
          tally: (0, _immutable.Map)({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: (0, _immutable.List)()
      });
      var nextState = (0, _srcCore.next)(state);
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        winner: 'Trainspotting'
      }));
    });
  });

  describe('vote', function () {
    it('creates a tally for the voted entry', function () {
      var state = (0, _immutable.Map)({
        pair: prevStateList
      });
      var nextState = (0, _srcCore.vote)(state, 'Trainspotting');

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        pair: prevStateList,
        tally: (0, _immutable.Map)({
          'Trainspotting': 1
        })
      }));
    });

    it('adds to existing tally for the voted entry', function () {
      var state = (0, _immutable.Map)({
        pair: prevStateList,
        tally: (0, _immutable.Map)({
          'Trainspotting': 3,
          '28 Days Later': 2
        })
      });
      var nextState = (0, _srcCore.vote)(state, 'Trainspotting');
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        pair: prevStateList,
        tally: (0, _immutable.Map)({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }));
    });
  });
});