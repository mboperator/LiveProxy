import makeStore from './src/store';
import startServer from './src/server';
import jsonServer from 'json-server';
import fs from 'fs';

import * as resourceActions from './src/actions/resource';

import story from './definitions/story';
import sentence from './definitions/sentence';
import path from 'path';

export default function() {
  const apiServer = jsonServer.create();
  const router = jsonServer.router(require('./db.json'));

  apiServer.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client') + '/index.html');
  });

  apiServer.use('/api/mock', router);
  apiServer.use(jsonServer.defaults);
  apiServer.listen(8091);

  const store = makeStore();
  startServer(store);
  store.dispatch(resourceActions['FETCH_RESOURCE']({def: story}));
  store.dispatch(resourceActions['FETCH_RESOURCE']({def: sentence}));
}
