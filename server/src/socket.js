import socket from 'socket.io';

export default function(store, server) {
  // Hook in to express server
  const io = socket.listen(server);

  store.subscribe(
    () => {
      io.emit('state', store.getState().toJS());
    }
  );

  // Setup Socket
  io.on('connection', (client) => {

    // Setup Client Interactions
    client.on('action', (action) => {

    });

    client.on('error', (error) => {
      console.log('ERROR', error);
    });
  });
}
