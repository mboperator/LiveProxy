import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import { StateViewerContainer } from './components/StateViewer';
import { PostsContainer } from './components/posts';
import getStore from './store';

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
      <Provider store={getStore()}>
        {() => <Root/>}
      </Provider>,
      document.getElementById('app')
    );
  });
});
