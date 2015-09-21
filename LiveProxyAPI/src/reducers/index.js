import { Map } from 'immutable';

import resource from './resource';

import asyncResource from './async-resource';

import {
  CREATE_RESOURCE,
  DESTROY_RESOURCE,
  PATCH_RESOURCE,
} from '../actions/resource';

import {
  CREATE_RESOURCE_SUCCESS,
  CREATE_RESOURCE_FAILURE,
  DESTROY_RESOURCE_SUCCESS,
  DESTROY_RESOURCE_FAILURE,
  PATCH_RESOURCE_SUCCESS,
  PATCH_RESOURCE_FAILURE,
  FETCH_RESOURCE_SUCCESS,
} from '../actions/async-resource';

export default function reducer(state, action) {
  switch (action.type) {
    case CREATE_RESOURCE:
      return resource[action.type](state, action);

    case CREATE_RESOURCE_SUCCESS:
      return asyncResource[action.type](state, action);

    case CREATE_RESOURCE_FAILURE:
      return asyncResource[action.type](state, action);

    case DESTROY_RESOURCE:
      console.log(action.type, action);
      return resource[action.type](state, action);

    case DESTROY_RESOURCE_SUCCESS:
      return asyncResource[action.type](state, action);

    case DESTROY_RESOURCE_FAILURE:
      return asyncResource[action.type](state, action);

    case PATCH_RESOURCE:
      return resource[action.type](state, action);

    case PATCH_RESOURCE_SUCCESS:
      return asyncResource[action.type](state, action);

    case PATCH_RESOURCE_FAILURE:
      return asyncResource[action.type](state, action);

    case FETCH_RESOURCE_SUCCESS:
      return asyncResource[FETCH_RESOURCE_SUCCESS](state, action);

    case 'NEXT':
      // return next(state);
      return state;

    default:
      return state;
  }
  return state;
}
