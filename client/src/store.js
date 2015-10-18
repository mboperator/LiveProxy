import reducer from './reducers/reducer';
import { setState } from './actions/action_creators';
import remoteActionMiddleware from './middleware/remote_action_middleware';
import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';

function getPort() {
  return location.port ? `:${location.port}` : '';
}
console.log('websock at', `${location.protocol}//${location.hostname}${getPort()}`);
const socket = io(`${location.protocol}//${location.hostname}${getPort()}`);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket),
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('state', state => {
  console.log('received data', state);
  store.dispatch(setState(state));
});

export default function getStore() {
  return store;
}
