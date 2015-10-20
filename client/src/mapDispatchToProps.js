import {
  FETCH_RESOURCE, CREATE_RESOURCE,
  DESTROY_RESOURCE, PATCH_RESOURCE
} from './constants/resources';

import * as actions from './actions/action_creators';

export default function mapDispatchToProps(dispatch) {
  return {
    add: req => dispatch(actions[CREATE_RESOURCE](req)),
    destroy: req => dispatch(actions[DESTROY_RESOURCE](req)),
    patch: req => dispatch(actions[PATCH_RESOURCE](req)),
    fetch: req => {
      const action = actions[FETCH_RESOURCE](req);
      dispatch(action);
    },
  };
}
