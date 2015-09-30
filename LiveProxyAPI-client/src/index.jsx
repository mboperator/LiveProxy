import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import io from 'socket.io-client';

import App from './components/App';
import { StateViewerContainer } from './components/StateViewer';
import { PostsContainer } from './components/posts';

import reducer from './reducers/reducer';
import { setState } from './actions/action_creators';
import remoteActionMiddleware from './middleware/remote_action_middleware';

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
    <Route name='stateViewer' path='/viewer' handler={StateViewerContainer}/>
    <Route name='posts' path='/posts' handler={PostsContainer}/>
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
