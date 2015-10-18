import reducer from './reducers/reducer';
import { setState } from './actions/action_creators';
import remoteActionMiddleware from './middleware/remote_action_middleware';
import optimisticMiddleware from './middleware/optimisticMiddleware';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';

function getPort() {
  return location.port ? `:${location.port}` : '';
}
console.log('websock at', `${location.protocol}//${location.hostname}${getPort()}`);
const socket = io(`${location.protocol}//${location.hostname}${getPort()}`);

const createStoreWithMiddleware = applyMiddleware(
  optimisticMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('state', action => {
  console.log('received data', action);
  store.dispatch(setState(action));
});

export default function getStore() {
  return store;
}
