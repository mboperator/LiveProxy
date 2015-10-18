import Server from 'socket.io';
import * as resourceActions from './actions/resource';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => {
      io.emit('state', store.getState().toJS());
    }
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', (action) => {

      console.log('received', action);
      store.dispatch(resourceActions[action.type]({...action}));
    });

    socket.on('error', (error) => {
      console.log('ERROR', error);
    });
  });
}
