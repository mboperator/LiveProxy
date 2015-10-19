import {
  CREATE_RESOURCE_SUCCESS,
  DESTROY_RESOURCE_SUCCESS,
  PATCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_SUCCESS,
  } from '../constants/async-resource';

import { Map, fromJS } from 'immutable';

export default {
  [CREATE_RESOURCE_SUCCESS]: (state, action) => {
    const { result, meta, payload } = action;
    const {
      def,
    } = meta;

    const resourceName = def.name;
    const oldId = payload.id;
    const newId = result.id;

    return state.updateIn(
      ['collections', resourceName],
        Map(),
        collection => {
          return collection
            .mapKeys(key => {
              if (key === oldId) { return newId; }
              return key;
            });
      }
    );
  },
  [DESTROY_RESOURCE_SUCCESS]: (state, action) => {
    return state;
  },
  [PATCH_RESOURCE_SUCCESS]: (state, action) => {
    return state;
  },
  [FETCH_RESOURCE_SUCCESS]: (state, { result: payload, meta }) => {
    const {
      def,
    } = meta;
    const result = payload[def.keys.plural];
    const resourceName = def.name;

    const updates = result.reduce((memo, object) => {
      return memo.set(object.id, object);
    }, Map());

    return state
      .setIn(
        ['collections', resourceName],
        updates
      );
  },
};

