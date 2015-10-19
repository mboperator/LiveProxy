import socket from 'socket.io';
import * as resourceActions from './actions/resource';

export default function startServer(app, store) {
  const io = socket.listen(app);
  store.subscribe(
    () => {
      // Insert subscription logic
    }
  );

  io.on('connection', (socket) => {
    // socket.emit('state', store.getState().toJS());
    socket.on('action', (action) => {

      // console.log('received', action);
      // store.dispatch(resourceActions[action.type]({...action}));
    });

    socket.on('error', (error) => {
      console.log('ERROR', error);
    });
  });
}
