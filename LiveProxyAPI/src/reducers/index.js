import resource from './resource';
import asyncResource from './async-resource';

export default function reducer(state, action) {
  let reducer = resource[action.type] || asyncResource[action.type];
  if (reducer) {
    return reducer(state, action);
  }

  return state;
}
