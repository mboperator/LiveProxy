import React from 'react';
import resourceActions from 'actions/resource';
import Router, { Route, DefaultRoute } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import { StateViewerContainer } from './components/StateViewer';
import { PostsContainer } from './components/posts';
import { StoriesContainer } from './components/stories';
import getStore from './store';

const routes = (
  <Route handler={App}>
    <Route name='stateViewer' path='/viewer' handler={StateViewerContainer}/>
    <Route name='posts' path='/posts' handler={PostsContainer}/>
    <Route name='stories' path='/stories' handler={StoriesContainer}/>
    <DefaultRoute handler={StateViewerContainer}/>
  </Route>
);

const store = getStore();

// Initial fetch
store.dispatch(resourceActions['FETCH_RESOURCE']);

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
