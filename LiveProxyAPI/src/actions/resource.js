import * as apiRequest from '../services/apiRequest';
import uuid from 'uuid';

export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const DESTROY_RESOURCE = 'DESTROY_RESOURCE';
export const PATCH_RESOURCE = 'PATCH_RESOURCE';

export function fetchResource(req) {
  return {
    type: FETCH_RESOURCE,
    meta: {
      def: req.def,
    },
    payload: null,
    promise: apiRequest.fetch(req),
  };
}

export function createResource(req) {
  if (!req.doc.id) {
    req.doc.id = uuid.v4();
  }

  return {
    type: CREATE_RESOURCE,
    meta: {
      def: req.def,
    },
    payload: req.doc,
    promise: apiRequest.create(req),
  };
}

export function destroyResource(req) {
  return {
    type: DESTROY_RESOURCE,
    meta: {
      def: req.def,
    },
    id: req.id,
    promise: apiRequest.destroy(req),
  };
}

export function patchResource(req) {
  return {
    type: PATCH_RESOURCE,
    meta: {
      def: req.def,
    },
    payload: req.doc,
    promise: apiRequest.patch(req),
  };
}
