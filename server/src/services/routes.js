import express from 'express';
import * as apiRequest from './apiRequest';
import * as resourceActions from '../actions/resource';
import story from '../../definitions/story';
import sentence from '../../definitions/sentence';

export default function createRouter(store) {
  var router = express.Router();

  router.get('/stories', (req, res) => {
    console.log('stories#index');
    const resources = store.getState().getIn(['collections', story.name]).toList().toJS();
    res.send({[story.keys.plural]: resources});
  });

  router.delete('/stories/:id', (req, res) => {
    console.log('stories#delete', req.params.id);
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

  router.post('/stories', (req, res) => {
    console.log('stories#create', req.body);
    const actionRequest = {def: story, doc: req.body};
    const action = resourceActions['CREATE_RESOURCE'](actionRequest);
    const { type, payload } = action;

    apiRequest.create(actionRequest).then( (data) => {
      res.send(data);
      store.dispatch({
        type: `${type}_SUCCESS`,
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success',
      });
    });
  });

  router.patch('/stories', (req, res) => {
    console.log('stories#patch', req.body);
    const actionRequest = {def: story, doc: req.body};
    const action = resourceActions['PATCH_RESOURCE'](actionRequest);
    const { type, payload } = action;

    apiRequest.patch(actionRequest).then( (data) => {
      res.send(data);
      store.dispatch({
        type: `${type}_SUCCESS`,
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success',
      });
    });
  });

  return router;
}
