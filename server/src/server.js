import socket from 'socket.io';

export default function startServer(app, store) {
  const io = socket.listen(app);
  store.subscribe(
    () => {
      io.emit('state', store.getState().toJS());
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
