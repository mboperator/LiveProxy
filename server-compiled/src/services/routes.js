'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createRouter;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _apiRequest = require('./apiRequest');

var apiRequest = _interopRequireWildcard(_apiRequest);

var _definitionsStory = require('../../definitions/story');

var _definitionsStory2 = _interopRequireDefault(_definitionsStory);

var _definitionsSentence = require('../../definitions/sentence');

var _definitionsSentence2 = _interopRequireDefault(_definitionsSentence);

var _actionsResource = require('../actions/resource');

var resourceActions = _interopRequireWildcard(_actionsResource);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var router = _express2['default'].Router();

var storyRoute = '/stories';
var sentenceRoute = '/sentences';

function createRouter(store) {

  router.get(storyRoute, function (req, res) {
    var resources = store.getState().getIn(['collections', _definitionsStory2['default'].name]).toList().toJS();
    res.send(_defineProperty({}, _definitionsStory2['default'].keys.plural, resources));
  });

  router['delete']('/stories/:id', function (req, res) {
    console.log('Deleting', req.params.id);
    var actionRequest = { def: _definitionsStory2['default'], id: req.params.id };
    var action = resourceActions['DESTROY_RESOURCE'](actionRequest);
    var type = action.type;
    var payload = action.payload;

    apiRequest.destroy(actionRequest).then(function (data) {
      store.dispatch({
        type: type + '_SUCCESS',
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success'
      });
      res.sendStatus(200);
    });
  });

  router.post(storyRoute, function (req, res) {
    console.log('CREATE', req.body);
    var actionRequest = { def: _definitionsStory2['default'], doc: req.body };
    var action = resourceActions['CREATE_RESOURCE'](actionRequest);
    var type = action.type;
    var payload = action.payload;

    apiRequest.create(actionRequest).then(function (data) {
      store.dispatch({
        type: type + '_SUCCESS',
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success'
      });
      res.send(data);
    });
  });

  router.patch(storyRoute, function (req, res) {
    var actionRequest = { def: _definitionsStory2['default'], doc: req.body };
    var action = resourceActions['PATCH_RESOURCE'](actionRequest);
    var type = action.type;
    var payload = action.payload;

    apiRequest.patch(actionRequest).then(function (data) {
      store.dispatch({
        type: type + '_SUCCESS',
        meta: action.meta,
        payload: payload,
        result: data,
        readyState: 'success'
      });
      res.send(data);
    });
  });
  return router;
}

;
module.exports = exports['default'];