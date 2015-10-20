import http from 'http';
import store from './src/store';
import initSocket from './src/socket';
import jsonServer from 'json-server';
import v1Router from './src/services/routes.js';
import * as resourceActions from './src/actions/resource';
import bodyParser from 'body-parser';

import story from './definitions/story';
import sentence from './definitions/sentence';
import path from 'path';

import { compose } from 'ramda';

function setupRoutes(app) {
  const jsonApi = jsonServer.router(require('./db.json'));

  app.use('/api/v1', v1Router(store));
  app.use('/api/mock', jsonApi);
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client') + '/index.html');
  });

  return app;
}

function setupMiddleware(app) {
  app.use(jsonServer.defaults);
  app.use(bodyParser.json());
  return app;
}

function initScripts(app) {
  store.dispatch(resourceActions['FETCH_RESOURCE']({def: story}));
  store.dispatch(resourceActions['FETCH_RESOURCE']({def: sentence}));
  return app;
}

function startServer(app) {
  const server = http.createServer(app);
  // Start Socket
  initSocket(store, server);
  server.listen(process.env.PORT || 8091);
}

export default function() {
  console.log('Booting server');
  const app = jsonServer.create();

  compose(
    startServer,
    initScripts,
    setupMiddleware,
    setupRoutes
  )(app);
}
