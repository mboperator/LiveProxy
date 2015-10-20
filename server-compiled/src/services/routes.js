'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createRouter;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apiRequest = require('./apiRequest');

var apiRequest = _interopRequireWildcard(_apiRequest);

var _actionsResource = require('../actions/resource');

var resourceActions = _interopRequireWildcard(_actionsResource);

var _definitionsStory = require('../../definitions/story');

var _definitionsStory2 = _interopRequireDefault(_definitionsStory);

var _definitionsSentence = require('../../definitions/sentence');

var _definitionsSentence2 = _interopRequireDefault(_definitionsSentence);

function createRouter(store) {
  var router = _express2['default'].Router();

  router.get('/stories', function (req, res) {
    console.log('stories#index');
    var resources = store.getState().getIn(['collections', _definitionsStory2['default'].name]).toList().toJS();
    res.send(_defineProperty({}, _definitionsStory2['default'].keys.plural, resources));
  });

  router['delete']('/stories/:id', function (req, res) {
    console.log('stories#delete', req.params.id);
    var actionRequest = { def: _definitionsStory2['default'], id: req.params.id };
    var action = resourceActions['DESTROY_RESOURCE'](actionRequest);
    var type = action.type;
    var payload = action.payload;

    apiRequest.destroy(actionRequest).then(function (data) {
      console.log('story destroyed', req.params.id);
      res.sendStatus(204);
      store.dispatch({
        type: type + '_SUCCESS',
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success'
      });
    });
  });

  router.post('/stories', function (req, res) {
    console.log('stories#create', req.body);
    var actionRequest = { def: _definitionsStory2['default'], doc: req.body };
    var action = resourceActions['CREATE_RESOURCE'](actionRequest);
    var type = action.type;
    var payload = action.payload;

    apiRequest.create(actionRequest).then(function (data) {
      res.send(data);
      store.dispatch({
        type: type + '_SUCCESS',
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success'
      });
    });
  });

  router.patch('/stories', function (req, res) {
    console.log('stories#patch', req.body);
    var actionRequest = { def: _definitionsStory2['default'], doc: req.body };
    var action = resourceActions['PATCH_RESOURCE'](actionRequest);
    var type = action.type;
    var payload = action.payload;

    apiRequest.patch(actionRequest).then(function (data) {
      res.send(data);
      store.dispatch({
        type: type + '_SUCCESS',
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success'
      });
    });
  });

  return router;
}

module.exports = exports['default'];