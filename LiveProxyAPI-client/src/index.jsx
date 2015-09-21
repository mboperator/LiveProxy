import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import io from 'socket.io-client';

import App from './components/App';
import { StateViewerContainer } from './components/StateViewer';

import reducer from './reducer';
import { setState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';

console.log('websock at', `${location.protocol}//${location.hostname}:8090`);
const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket),
)(createStore);

const store = createStoreWithMiddleware(reducer);

socket.on('state', state => {
  console.log('received data', state);
  store.dispatch(setState(state));
});

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={StateViewerContainer}/>
  </Route>
);

document.addEventListener('DOMContentLoaded', () => {
  Router.run(routes, Root => {
    React.render(
      <Provider store={store}>
        {() => <Root/>}
      </Provider>,
      document.getElementById('app')
    );
  });
});
