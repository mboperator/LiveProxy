export default () => next => action => {
  const { promise, type, payload } = action;

  if (!promise) { return next(action); }
  // CREATE_RESOURCE
  // TODO: Use ...rest
  next({
    type,
    meta: action.meta,
    id: action.id,
    payload,
    readyState: 'request',
  });

  return promise.then(res => {
    //CREATE_RESOURCE_SUCCESS
    next({
      type: `${type}_SUCCESS`,
      meta: action.meta,
      payload: payload,
      result: res.data,
      readyState: 'success',
    });
  }).catch(err => {
    //CREATE_RESOURCE_FAILURE
    next({
      type: `${type}_FAILURE`,
      meta: action.meta,
      payload: payload,
      result: err,
      readyState: 'failure',
    });
  });
};
