export default store => next => action => {
  // console.log('Action in flight', action.type, action);
  return next(action);
};
