import http from 'http';
import makeStore from './src/store';
import startServer from './src/server';
import jsonServer from 'json-server';
import v1Router from './src/services/routes.js';
import * as resourceActions from './src/actions/resource';

import story from './definitions/story';
import sentence from './definitions/sentence';
import path from 'path';

export default function() {
  const apiServer = jsonServer.create();
  const router = jsonServer.router(require('./db.json'));
  const store = makeStore();
  store.dispatch(resourceActions['FETCH_RESOURCE']({def: story}));
  store.dispatch(resourceActions['FETCH_RESOURCE']({def: sentence}));

  apiServer.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client') + '/index.html');
  });
  apiServer.use('/api/mock', router);
  apiServer.use('/api/v1', v1Router(store));
  apiServer.use(jsonServer.defaults);

  const server = http.createServer(apiServer);
  startServer(server, store);
  server.listen(process.env.PORT || 8091);
}
