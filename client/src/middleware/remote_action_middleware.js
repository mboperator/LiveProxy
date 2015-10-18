export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    console.log('emitting', action);
    socket.emit('action', action);
  }
  return next(action);
};
