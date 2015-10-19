import { createStore, applyMiddleware } from 'redux';
import optimisticMiddleware from './middleware/optimisticMiddleware';
import stateLoggerMiddleware from './middleware/stateLoggerMiddleware';
import reducer from './reducers';
import { Map } from 'immutable';

const createStoreWithMiddleware = applyMiddleware(
  optimisticMiddleware,
  stateLoggerMiddleware
)(createStore);

export default function configureStore(initialState=Map({ collections: Map() })) {
  return createStoreWithMiddleware(reducer, initialState);
};
