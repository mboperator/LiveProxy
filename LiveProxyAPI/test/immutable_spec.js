import { expect } from 'chai';
import { List, Map } from 'immutable';

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

describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(nextStateList);
      expect(state).to.equal(prevStateList);
    });
  });

  describe('a map', () => {
    function addMovie(currentState, movie) {
      return currentState.update(
        'movies',
        movies => movies.push(movie)
      );
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later'),
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: nextStateList,
      }));

      expect(state).to.equal(Map({
        movies: prevStateList,
      }));
    });
  });
});
