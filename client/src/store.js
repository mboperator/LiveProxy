import reducer from 'reducers';
import { setState } from './actions/action_creators';
import optimisticMiddleware from './middleware/optimisticMiddleware';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import { Map } from 'immutable';
import createLogger from 'redux-logger';


function getPort() {
  return location.port ? `:${location.port}` : '';
}
console.log('websock at', `${location.protocol}//${location.hostname}${getPort()}`);
const socket = io(`${location.protocol}//${location.hostname}${getPort()}`);

const logger = createLogger({
  transformer: object => { return object.toJS ? object.toJS() : object; },
  actionTransformer: object => {
    if (object.payload.def) {
      return {
        ... object,
        payload: {
          ... object.payload,
          def: object.payload.def.toJS(),
        },
      };
    }
    return object;
  },
});

const createStoreWithMiddleware = applyMiddleware(
  logger,
  optimisticMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer, Map({}));

socket.on('state', action => {
  console.log('received data', action);
  store.dispatch(setState(action));
});

export default function getStore() {
  return store;
}
