import makeStore from './src/store';
import startServer from './src/server';
import jsonServer from 'json-server';

import * as resourceActions from './src/actions/resource';

import story from './definitions/story';
import sentence from './definitions/sentence';

const apiServer = jsonServer.create();
const router = jsonServer.router(require('./db.json'));

apiServer.use('/api/mock', router);
apiServer.listen(8091);

export const store = makeStore();
startServer(store);

// TEST CALLS

store.dispatch(resourceActions['FETCH_RESOURCE']({def: story}));
store.dispatch(resourceActions['FETCH_RESOURCE']({def: sentence}));
store.dispatch(resourceActions['CREATE_RESOURCE']({
  def: story,
  doc: {
    title: 'The story of javascript churn',
  },
}));

store.dispatch(resourceActions['CREATE_RESOURCE']({
  def: sentence,
  doc: {
    story_id: 1,
    content: 'there was a server that used all of the buzzwords',
  },
}));
