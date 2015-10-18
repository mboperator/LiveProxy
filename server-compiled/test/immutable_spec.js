'use strict';

var _chai = require('chai');

var _immutable = require('immutable');

var describe = global.describe;
var it = global.it;

var nextStateList = _immutable.List.of('Trainspotting', '28 Days Later', 'Sunshine');

var prevStateList = _immutable.List.of('Trainspotting', '28 Days Later');

describe('immutability', function () {
  describe('a number', function () {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', function () {
      var state = 42;
      var nextState = increment(state);

      (0, _chai.expect)(nextState).to.equal(43);
      (0, _chai.expect)(state).to.equal(42);
    });
  });

  describe('a list', function () {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', function () {
      var state = _immutable.List.of('Trainspotting', '28 Days Later');
      var nextState = addMovie(state, 'Sunshine');

      (0, _chai.expect)(nextState).to.equal(nextStateList);
      (0, _chai.expect)(state).to.equal(prevStateList);
    });
  });

  describe('a map', function () {
    function addMovie(currentState, movie) {
      return currentState.update('movies', function (movies) {
        return movies.push(movie);
      });
    }

    it('is immutable', function () {
      var state = (0, _immutable.Map)({
        movies: _immutable.List.of('Trainspotting', '28 Days Later')
      });
      var nextState = addMovie(state, 'Sunshine');

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        movies: nextStateList
      }));

      (0, _chai.expect)(state).to.equal((0, _immutable.Map)({
        movies: prevStateList
      }));
    });
  });
});