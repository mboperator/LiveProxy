import uuid from 'uuid';

import {
  FETCH_RESOURCE, CREATE_RESOURCE,
  DESTROY_RESOURCE, PATCH_RESOURCE
} from '../constants/resources';

export default {
  setState(state) {
    return {
      type: 'SET_STATE',
      state,
    };
  },

  [FETCH_RESOURCE]: (req) => {
    return {
      type: FETCH_RESOURCE,
      def: req.def,
      meta: {
        def: req.def,
        remote: true,
      },
    };
  },

  [CREATE_RESOURCE]: (req) => {
    if (!req.doc.id) {
      req.doc.id = uuid.v4();
    }

    return {
      type: CREATE_RESOURCE,
      def: req.def,
      meta: {
        def: req.def,
        remote: true,
      },
      doc: req.doc,
    };
  },

  [DESTROY_RESOURCE]: (req) => {
    return {
      type: DESTROY_RESOURCE,
      def: req.def,
      meta: {
        def: req.def,
        remote: true,
      },
      id: req.id,
    };
  },

  [PATCH_RESOURCE]: (req) => {
    return {
      type: PATCH_RESOURCE,
      def: req.def,
      meta: {
        def: req.def,
        remote: true,
      },
      doc: req.doc,
    };
  },
};
