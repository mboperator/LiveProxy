import {
  CREATE_RESOURCE,
  DESTROY_RESOURCE,
  PATCH_RESOURCE,
  } from '../actions/resource';

import { fromJS, Map } from 'immutable';

function upsert(state, action) {
  const {
    payload,
  } = action;

  const {
    def,
  } = action.meta;
  const { id } = payload;

  const resourceName = def.name;
  const map = fromJS(payload);

  return state.updateIn(
    ['collections', resourceName],
    Map(),
    collection => {
      return collection.set(id, map);
    }
  );
}

export default {
  [CREATE_RESOURCE]: (state, action) => {
    return upsert(state, action);
  },
  [DESTROY_RESOURCE]: (state, action) => {
    const {id, meta} = action;
    const {
      def,
    } = meta;
    const resourceName = def.name;

    return state.updateIn(
      ['collections', resourceName],
        Map(),
        collection => {
          console.log('DESTROY collection', id);
          return collection.delete(id);
        }
    );
  },
  [PATCH_RESOURCE]: (state, action) => {
    return upsert(state, action);
  },
};

