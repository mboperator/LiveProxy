import {
  FETCH_RESOURCE, CREATE_RESOURCE,
  DESTROY_RESOURCE, PATCH_RESOURCE
} from './constants/resources';

import getStore from './store';
import * as actions from './actions/action_creators';

const store = getStore();

export default {
  add: req => store.dispatch(actions[CREATE_RESOURCE](req)),
  destroy: req => store.dispatch(actions[DESTROY_RESOURCE](req)),
  patch: req => store.dispatch(actions[PATCH_RESOURCE](req)),
  fetch: req => store.dispatch(actions[FETCH_RESOURCE](req)),
};
