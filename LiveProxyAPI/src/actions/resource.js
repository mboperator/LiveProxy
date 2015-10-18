import * as apiRequest from '../services/apiRequest';

import {
  FETCH_RESOURCE, CREATE_RESOURCE,
  DESTROY_RESOURCE, PATCH_RESOURCE
} from '../constants/resource';

export default {
  [FETCH_RESOURCE]: (req) => {
    return {
      type: FETCH_RESOURCE,
      meta: {
        def: req.def,
      },
      payload: null,
      promise: apiRequest.fetch(req),
    };
  },

  [CREATE_RESOURCE]: (req) => {
    return {
      type: CREATE_RESOURCE,
      meta: {
        def: req.def,
      },
      payload: req.doc,
      promise: apiRequest.create(req),
    };
  },

  [DESTROY_RESOURCE]: (req) => {
    return {
      type: DESTROY_RESOURCE,
      meta: {
        def: req.def,
      },
      id: req.id,
      promise: apiRequest.destroy(req),
    };
  },

  [PATCH_RESOURCE]: (req) => {
    return {
      type: PATCH_RESOURCE,
      meta: {
        def: req.def,
      },
      payload: req.doc,
      promise: apiRequest.patch(req),
    };
  },
};

