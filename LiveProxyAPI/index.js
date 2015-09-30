import makeStore from './src/store';
import startServer from './src/server';
import jsonServer from 'json-server';

import * as resourceActions from './src/actions/resource';

import post from './definitions/post';
import user from './definitions/user';
import comment from './definitions/comment';

const apiServer = jsonServer.create();
const router = jsonServer.router(require('./db.json'));

apiServer.use('/api/mock', router);
apiServer.listen(8091);

export const store = makeStore();
startServer(store);

// TEST CALLS

store.dispatch(resourceActions['FETCH_RESOURCE']({def: post}));
// store.dispatch(resourceActions['CREATE_RESOURCE']({
//   def: post,
//   doc: {
//     user_id: 1,
//     title: 'New Post',
//     body: 'Another Post',
//   },
// }));

// setTimeout(() => {
//   store.dispatch(resourceActions['PATCH_RESOURCE']({
//     def: post,
//     doc: {
//       title: 'Modified Post',
//       body: 'Post modified',
//       id: 1,
//     },
//   }));
// }, 2000);

store.dispatch(resourceActions['FETCH_RESOURCE']({def: comment}));
store.dispatch(resourceActions['FETCH_RESOURCE']({def: user}));
// store.dispatch({type: 'NEXT'});
