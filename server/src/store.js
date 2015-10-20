import { createStore, applyMiddleware } from 'redux';
import optimisticMiddleware from './middleware/optimisticMiddleware';
import stateLoggerMiddleware from './middleware/stateLoggerMiddleware';
import reducer from './reducers';
import { Map } from 'immutable';

const createStoreWithMiddleware = applyMiddleware(
  optimisticMiddleware,
  stateLoggerMiddleware
)(createStore);

let store;

function initStore(initialState = Map()) {
  if (store) { return store; }
  store = createStoreWithMiddleware(reducer, initialState);
  return store;
}


export default initStore();
