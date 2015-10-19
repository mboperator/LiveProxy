import makeStore from '../store';
import * as apiRequest from './apiRequest';
import story from '../../definitions/story';
import sentence from '../../definitions/sentence';
import * as resourceActions from '../actions/resource';
import express from 'express';

var router = express.Router();

const storyRoute = '/stories';
const sentenceRoute = '/sentences';

export default function createRouter(store) {

  router.get(storyRoute, function (req, res) {
    const resources = store.getState().getIn(['collections']).toJS();
    console.log('resources');
    res.send({[story.keys.plural]: resources});
  });

  router.delete('/stories/:id', function (req, res) {
    console.log('Deleting', req.params.id);
    const actionRequest = {def: story, id: req.params.id};
    const action = resourceActions['DESTROY_RESOURCE'](actionRequest);
    const { type, payload } = action;
    apiRequest.destroy(actionRequest).then( (data) => {
      store.dispatch({
        type: `${type}_SUCCESS`,
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success',
      });
      res.sendStatus(200);
    });
  });

  router.post(storyRoute, function (req, res) {
    console.log('CREATE', req.body);
    const actionRequest = {def: story, doc: req.body};
    const action = resourceActions['CREATE_RESOURCE'](actionRequest);
    const { type, payload } = action;

    apiRequest.create(actionRequest).then( (data) => {
      store.dispatch({
        type: `${type}_SUCCESS`,
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success',
      });
      res.send(data);
    });
  });

  router.patch(storyRoute, function (req, res) {
    const actionRequest = {def: story, doc: req.body};
    const action = resourceActions['PATCH_RESOURCE'](actionRequest);
    const { type, payload } = action;
    apiRequest.patch(actionRequest).then( (data) => {
      store.dispatch({
        type: `${type}_SUCCESS`,
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success',
      });
      res.send(data)
    })
  });
  return router;
};
