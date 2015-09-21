export default socket => store => next => action => {
  if (action.meta && action.meta.remote) {
    console.log('emiting', action);
    socket.emit('action', action);
  }
  return next(action);
};
