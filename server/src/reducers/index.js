import * as resource from './resource';
import * as asyncResource from './async-resource';

const reducers = { ... resource, ... asyncResource };

export default function reducer(state, action) {
  const runReducer = reducers[action.type];
  if (runReducer) { return runReducer(state, action); }
  return state;
}
