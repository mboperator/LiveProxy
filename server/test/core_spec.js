import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/core';

const {describe, it} = global;

const nextStateList = List.of(
  'Trainspotting',
  '28 Days Later',
  'Sunshine'
);

const prevStateList = List.of(
  'Trainspotting',
  '28 Days Later'
);

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entires to the state', () => {
      const state = Map();
      const entries = prevStateList;
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: prevStateList,
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: prevStateList,
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entires under vote', () => {
      const state = Map({
        entries: nextStateList,
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: prevStateList,
        }),
        entries: List.of('Sunshine'),
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2,
          }),
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours'),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions'),
        }),
        entries: List.of('127 Hours', 'Trainspotting'),
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 3,
          }),
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours'),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions'),
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later'),
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2,
          }),
        }),
        entries: List(),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting',
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: prevStateList,
      });
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(Map({
        pair: prevStateList,
        tally: Map({
          'Trainspotting': 1,
        }),
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: prevStateList,
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2,
        }),
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        pair: prevStateList,
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2,
        }),
      }));
    });
  });
});
