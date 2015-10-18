'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var definition = {
  loading: false,
  name: 'comments',
  keys: {
    singular: 'comment',
    plural: 'comments'
  }
};

exports['default'] = definition;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var definition = {
  loading: false,
  name: 'posts',
  keys: {
    singular: 'post',
    plural: 'posts'
  }
};

exports['default'] = definition;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var definition = {
  loading: false,
  name: 'sentences',
  keys: {
    singular: 'sentence',
    plural: 'sentences'
  },
  payloadFormatter: function payloadFormatter(sentence) {
    var story_id = sentence.story_id;

    var rest = _objectWithoutProperties(sentence, ['story_id']);

    return {
      sentence: rest,
      story_id: story_id
    };
  }
};

exports['default'] = definition;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var definition = {
  loading: false,
  name: 'stories',
  keys: {
    singular: 'story',
    plural: 'stories'
  },
  payloadFormatter: function payloadFormatter(story) {
    return {
      story: story
    };
  }
};

exports['default'] = definition;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var definition = {
  loading: false,
  name: 'users',
  keys: {
    singular: 'user',
    plural: 'users'
  }
};

exports['default'] = definition;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcStore = require('./src/store');

var _srcStore2 = _interopRequireDefault(_srcStore);

var _srcServer = require('./src/server');

var _srcServer2 = _interopRequireDefault(_srcServer);

var _jsonServer = require('json-server');

var _jsonServer2 = _interopRequireDefault(_jsonServer);

var _srcActionsResource = require('./src/actions/resource');

var resourceActions = _interopRequireWildcard(_srcActionsResource);

var _definitionsStory = require('./definitions/story');

var _definitionsStory2 = _interopRequireDefault(_definitionsStory);

var _definitionsSentence = require('./definitions/sentence');

var _definitionsSentence2 = _interopRequireDefault(_definitionsSentence);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

exports['default'] = function () {
  var apiServer = _jsonServer2['default'].create();
  var router = _jsonServer2['default'].router(require('./db.json'));

  apiServer.get('/', function (req, res) {
    res.sendFile(_path2['default'].join(__dirname, '../', 'client') + '/index.html');
  });

  apiServer.use('/api/mock', router);
  apiServer.use(_jsonServer2['default'].defaults);
  apiServer.listen(process.env.PORT || 8091);

  var store = (0, _srcStore2['default'])();
  (0, _srcServer2['default'])(store);
  store.dispatch(resourceActions['FETCH_RESOURCE']({ def: _definitionsStory2['default'] }));
  store.dispatch(resourceActions['FETCH_RESOURCE']({ def: _definitionsSentence2['default'] }));
};

module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _constantsAsyncResource = require('../constants/async-resource');

exports['default'] = _defineProperty({}, _constantsAsyncResource.FETCH_RESOURCE_SUCCESS, function (action) {
  return action;
});
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _servicesApiRequest = require('../services/apiRequest');

var apiRequest = _interopRequireWildcard(_servicesApiRequest);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _constantsResource = require('../constants/resource');

exports['default'] = (_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE = {}, _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.FETCH_RESOURCE, function (req) {
  return {
    type: _constantsResource.FETCH_RESOURCE,
    meta: {
      def: req.def
    },
    payload: null,
    promise: apiRequest.fetch(req)
  };
}), _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.CREATE_RESOURCE, function (req) {
  if (!req.doc.id) {
    req.doc.id = _uuid2['default'].v4();
  }

  return {
    type: _constantsResource.CREATE_RESOURCE,
    meta: {
      def: req.def
    },
    payload: req.doc,
    promise: apiRequest.create(req)
  };
}), _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.DESTROY_RESOURCE, function (req) {
  return {
    type: _constantsResource.DESTROY_RESOURCE,
    meta: {
      def: req.def
    },
    id: req.id,
    promise: apiRequest.destroy(req)
  };
}), _defineProperty(_FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.PATCH_RESOURCE, function (req) {
  return {
    type: _constantsResource.PATCH_RESOURCE,
    meta: {
      def: req.def
    },
    payload: req.doc,
    promise: apiRequest.patch(req)
  };
}), _FETCH_RESOURCE$CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE);
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CREATE_RESOURCE_SUCCESS = 'CREATE_RESOURCE_SUCCESS';
exports.CREATE_RESOURCE_SUCCESS = CREATE_RESOURCE_SUCCESS;
var CREATE_RESOURCE_FAILURE = 'CREATE_RESOURCE_FAILURE';
exports.CREATE_RESOURCE_FAILURE = CREATE_RESOURCE_FAILURE;
var DESTROY_RESOURCE_SUCCESS = 'DESTROY_RESOURCE_SUCCESS';
exports.DESTROY_RESOURCE_SUCCESS = DESTROY_RESOURCE_SUCCESS;
var DESTROY_RESOURCE_FAILURE = 'DESTROY_RESOURCE_FAILURE';
exports.DESTROY_RESOURCE_FAILURE = DESTROY_RESOURCE_FAILURE;
var PATCH_RESOURCE_SUCCESS = 'PATCH_RESOURCE_SUCCESS';
exports.PATCH_RESOURCE_SUCCESS = PATCH_RESOURCE_SUCCESS;
var PATCH_RESOURCE_FAILURE = 'PATCH_RESOURCE_FAILURE';
exports.PATCH_RESOURCE_FAILURE = PATCH_RESOURCE_FAILURE;
var FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
exports.FETCH_RESOURCE_SUCCESS = FETCH_RESOURCE_SUCCESS;
var FETCH_RESOURCE_FAILURE = 'FETCH_RESOURCE_FAILURE';
exports.FETCH_RESOURCE_FAILURE = FETCH_RESOURCE_FAILURE;
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var FETCH_RESOURCE = 'FETCH_RESOURCE';
exports.FETCH_RESOURCE = FETCH_RESOURCE;
var CREATE_RESOURCE = 'CREATE_RESOURCE';
exports.CREATE_RESOURCE = CREATE_RESOURCE;
var DESTROY_RESOURCE = 'DESTROY_RESOURCE';
exports.DESTROY_RESOURCE = DESTROY_RESOURCE;
var PATCH_RESOURCE = 'PATCH_RESOURCE';
exports.PATCH_RESOURCE = PATCH_RESOURCE;
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  return function (next) {
    return function (action) {
      var promise = action.promise;
      var type = action.type;
      var payload = action.payload;

      if (!promise) {
        return next(action);
      }
      // CREATE_RESOURCE
      // TODO: Use ...rest
      next({
        type: type,
        meta: action.meta,
        id: action.id,
        payload: payload,
        readyState: 'request'
      });

      return promise.then(function (res) {
        //CREATE_RESOURCE_SUCCESS
        next({
          type: type + '_SUCCESS',
          meta: action.meta,
          payload: payload,
          result: res.data,
          readyState: 'success'
        });
      })['catch'](function (err) {
        //CREATE_RESOURCE_FAILURE
        next({
          type: type + '_FAILURE',
          meta: action.meta,
          payload: payload,
          result: err,
          readyState: 'failure'
        });
      });
    };
  };
};

module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (store) {
  return function (next) {
    return function (action) {
      // console.log('Action in flight', action.type, action);
      return next(action);
    };
  };
};

module.exports = exports["default"];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _constantsAsyncResource = require('../constants/async-resource');

var _immutable = require('immutable');

exports['default'] = (_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS = {}, _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.CREATE_RESOURCE_SUCCESS, function (state, action) {
  var result = action.result;
  var meta = action.meta;
  var payload = action.payload;
  var def = meta.def;

  var resourceName = def.name;
  var oldId = payload.id;
  var newId = result.id;

  return state.updateIn(['collections', resourceName], (0, _immutable.Map)(), function (collection) {
    return collection.mapKeys(function (key) {
      if (key === oldId) {
        return newId;
      }
      return key;
    });
  });
}), _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.DESTROY_RESOURCE_SUCCESS, function (state, action) {
  return state;
}), _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.PATCH_RESOURCE_SUCCESS, function (state, action) {
  return state;
}), _defineProperty(_CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS, _constantsAsyncResource.FETCH_RESOURCE_SUCCESS, function (state, _ref) {
  var payload = _ref.result;
  var meta = _ref.meta;
  var def = meta.def;

  var result = payload[def.keys.plural];
  var resourceName = def.name;

  var updates = result.reduce(function (memo, object) {
    return memo.set(object.id, object);
  }, (0, _immutable.Map)());

  return state.setIn(['collections', resourceName], updates);
}), _CREATE_RESOURCE_SUCCESS$DESTROY_RESOURCE_SUCCESS$PATCH_RESOURCE_SUCCESS$FETCH_RESOURCE_SUCCESS);
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = reducer;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _resource = require('./resource');

var resource = _interopRequireWildcard(_resource);

var _asyncResource = require('./async-resource');

var asyncResource = _interopRequireWildcard(_asyncResource);

var reducers = _extends({}, resource, asyncResource);

function reducer(state, action) {
  var runReducer = reducers[action.type];
  if (runReducer) {
    return runReducer(state, action);
  }
  return state;
}

module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _constantsResource = require('../constants/resource');

var _immutable = require('immutable');

function upsert(state, action) {
  var payload = action.payload;
  var def = action.meta.def;
  var id = payload.id;

  var resourceName = def.name;
  var map = (0, _immutable.fromJS)(payload);

  return state.updateIn(['collections', resourceName], (0, _immutable.Map)(), function (collection) {
    return collection.set(id, map);
  });
}

exports['default'] = (_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE = {}, _defineProperty(_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.CREATE_RESOURCE, function (state, action) {
  return upsert(state, action);
}), _defineProperty(_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.DESTROY_RESOURCE, function (state, action) {
  var id = action.id;
  var meta = action.meta;
  var def = meta.def;

  var resourceName = def.name;

  return state.updateIn(['collections', resourceName], (0, _immutable.Map)(), function (collection) {
    console.log('DESTROY collection', id);
    return collection['delete'](id);
  });
}), _defineProperty(_CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE, _constantsResource.PATCH_RESOURCE, function (state, action) {
  return upsert(state, action);
}), _CREATE_RESOURCE$DESTROY_RESOURCE$PATCH_RESOURCE);
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = startServer;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _actionsResource = require('./actions/resource');

var resourceActions = _interopRequireWildcard(_actionsResource);

function startServer(store) {
  var io = new _socketIo2['default']().attach(8090);

  store.subscribe(function () {
    io.emit('state', store.getState().toJS());
  });

  io.on('connection', function (socket) {
    socket.emit('state', store.getState().toJS());
    socket.on('action', function (action) {

      console.log('received', action);
      store.dispatch(resourceActions[action.type](_extends({}, action)));
    });

    socket.on('error', function (error) {
      console.log('ERROR', error);
    });
  });
}

module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.fetch = fetch;
exports.create = create;
exports.destroy = destroy;
exports.patch = patch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var BASE_URL = 'http://liveproxy-rails-example.herokuapp.com';
// const BASE_URL = 'http://localhost:8092';
var API_PATH = 'api/v1/';

function pathForResource(def) {
  return BASE_URL + '/' + API_PATH + '/' + def.keys.plural;
}

function fetch(action) {
  var deferred = _q2['default'].defer();
  var def = action.def;

  _axios2['default'].get(pathForResource(def)).then(function (res) {
    return deferred.resolve(res);
  })['catch'](function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
}

function create(action) {
  var deferred = _q2['default'].defer();
  var def = action.def;
  var _def$payloadFormatter = def.payloadFormatter;
  var payloadFormatter = _def$payloadFormatter === undefined ? function (doc) {
    return doc;
  } : _def$payloadFormatter;

  _axios2['default'].post(pathForResource(def), payloadFormatter(action.doc)).then(function (res) {
    return deferred.resolve(res);
  })['catch'](function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
}

function destroy(action) {
  var deferred = _q2['default'].defer();
  var id = action.id;
  var def = action.def;

  _axios2['default']['delete'](pathForResource(def) + '/' + id).then(function (res) {
    return deferred.resolve(res);
  })['catch'](function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
}

function patch(action) {
  var deferred = _q2['default'].defer();
  var def = action.def;
  var doc = action.doc;

  _axios2['default'].patch(pathForResource(def) + '/' + doc.id, action.doc).then(function (res) {
    return deferred.resolve(res);
  })['catch'](function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
}
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = configureStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _middlewareOptimisticMiddleware = require('./middleware/optimisticMiddleware');

var _middlewareOptimisticMiddleware2 = _interopRequireDefault(_middlewareOptimisticMiddleware);

var _middlewareStateLoggerMiddleware = require('./middleware/stateLoggerMiddleware');

var _middlewareStateLoggerMiddleware2 = _interopRequireDefault(_middlewareStateLoggerMiddleware);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _immutable = require('immutable');

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_middlewareOptimisticMiddleware2['default'], _middlewareStateLoggerMiddleware2['default'])(_redux.createStore);

function configureStore() {
  var initialState = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.Map)({ collections: (0, _immutable.Map)() }) : arguments[0];

  return createStoreWithMiddleware(_reducers2['default'], initialState);
}

;
module.exports = exports['default'];
'use strict';

var _immutable = require('immutable');

var _chai = require('chai');

var _srcCore = require('../src/core');

var describe = global.describe;
var it = global.it;

var nextStateList = _immutable.List.of('Trainspotting', '28 Days Later', 'Sunshine');

var prevStateList = _immutable.List.of('Trainspotting', '28 Days Later');

describe('application logic', function () {
  describe('setEntries', function () {
    it('adds the entires to the state', function () {
      var state = (0, _immutable.Map)();
      var entries = prevStateList;
      var nextState = (0, _srcCore.setEntries)(state, entries);

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        entries: prevStateList
      }));
    });

    it('converts to immutable', function () {
      var state = (0, _immutable.Map)();
      var entries = ['Trainspotting', '28 Days Later'];
      var nextState = (0, _srcCore.setEntries)(state, entries);

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        entries: prevStateList
      }));
    });
  });

  describe('next', function () {
    it('takes the next two entires under vote', function () {
      var state = (0, _immutable.Map)({
        entries: nextStateList
      });
      var nextState = (0, _srcCore.next)(state);

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: prevStateList
        }),
        entries: _immutable.List.of('Sunshine')
      }));
    });

    it('puts winner of current vote back to entries', function () {
      var state = (0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Trainspotting', '28 Days Later'),
          tally: (0, _immutable.Map)({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: _immutable.List.of('Sunshine', 'Millions', '127 Hours')
      });
      var nextState = (0, _srcCore.next)(state);
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Sunshine', 'Millions')
        }),
        entries: _immutable.List.of('127 Hours', 'Trainspotting')
      }));
    });

    it('puts both from tied vote back to entries', function () {
      var state = (0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Trainspotting', '28 Days Later'),
          tally: (0, _immutable.Map)({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: _immutable.List.of('Sunshine', 'Millions', '127 Hours')
      });
      var nextState = (0, _srcCore.next)(state);
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Sunshine', 'Millions')
        }),
        entries: _immutable.List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));
    });

    it('marks winner when just one entry left', function () {
      var state = (0, _immutable.Map)({
        vote: (0, _immutable.Map)({
          pair: _immutable.List.of('Trainspotting', '28 Days Later'),
          tally: (0, _immutable.Map)({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: (0, _immutable.List)()
      });
      var nextState = (0, _srcCore.next)(state);
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        winner: 'Trainspotting'
      }));
    });
  });

  describe('vote', function () {
    it('creates a tally for the voted entry', function () {
      var state = (0, _immutable.Map)({
        pair: prevStateList
      });
      var nextState = (0, _srcCore.vote)(state, 'Trainspotting');

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        pair: prevStateList,
        tally: (0, _immutable.Map)({
          'Trainspotting': 1
        })
      }));
    });

    it('adds to existing tally for the voted entry', function () {
      var state = (0, _immutable.Map)({
        pair: prevStateList,
        tally: (0, _immutable.Map)({
          'Trainspotting': 3,
          '28 Days Later': 2
        })
      });
      var nextState = (0, _srcCore.vote)(state, 'Trainspotting');
      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        pair: prevStateList,
        tally: (0, _immutable.Map)({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }));
    });
  });
});
'use strict';

var _chai = require('chai');

var _immutable = require('immutable');

var describe = global.describe;
var it = global.it;

var nextStateList = _immutable.List.of('Trainspotting', '28 Days Later', 'Sunshine');

var prevStateList = _immutable.List.of('Trainspotting', '28 Days Later');

describe('immutability', function () {
  describe('a number', function () {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', function () {
      var state = 42;
      var nextState = increment(state);

      (0, _chai.expect)(nextState).to.equal(43);
      (0, _chai.expect)(state).to.equal(42);
    });
  });

  describe('a list', function () {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', function () {
      var state = _immutable.List.of('Trainspotting', '28 Days Later');
      var nextState = addMovie(state, 'Sunshine');

      (0, _chai.expect)(nextState).to.equal(nextStateList);
      (0, _chai.expect)(state).to.equal(prevStateList);
    });
  });

  describe('a map', function () {
    function addMovie(currentState, movie) {
      return currentState.update('movies', function (movies) {
        return movies.push(movie);
      });
    }

    it('is immutable', function () {
      var state = (0, _immutable.Map)({
        movies: _immutable.List.of('Trainspotting', '28 Days Later')
      });
      var nextState = addMovie(state, 'Sunshine');

      (0, _chai.expect)(nextState).to.equal((0, _immutable.Map)({
        movies: nextStateList
      }));

      (0, _chai.expect)(state).to.equal((0, _immutable.Map)({
        movies: prevStateList
      }));
    });
  });
});
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _chai = require('chai');

var _srcReducer = require('../src/reducer');

var _srcReducer2 = _interopRequireDefault(_srcReducer);

var it = global.it;
var describe = global.describe;

describe('reducer', function () {
  it('has an initial state', function () {
    var action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    var nextState = (0, _srcReducer2['default'])(undefined, action);
    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      entries: ['Trainspotting']
    }));
  });

  it('handles SET_ENTRIES', function () {
    var initialState = (0, _immutable.Map)();
    var action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    var nextState = (0, _srcReducer2['default'])(initialState, action);

    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', function () {
    var initialState = (0, _immutable.fromJS)({
      entries: ['Trainspotting', '28 Days Later']
    });
    var action = { type: 'NEXT' };
    var nextState = (0, _srcReducer2['default'])(initialState, action);

    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }));
  });

  it('handles VOTE', function () {
    var initialState = (0, _immutable.fromJS)({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    });
    var action = { type: 'VOTE', entry: 'Trainspotting' };
    var nextState = (0, _srcReducer2['default'])(initialState, action);

    (0, _chai.expect)(nextState).to.equal((0, _immutable.fromJS)({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: { Trainspotting: 1 }
      },
      entries: []
    }));
  });

  it('can be used with reduce', function () {
    var actions = [{ type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later'] }, { type: 'NEXT' }, { type: 'VOTE', entry: 'Trainspotting' }, { type: 'VOTE', entry: '28 Days Later' }, { type: 'VOTE', entry: 'Trainspotting' }, { type: 'NEXT' }];
    var finalState = actions.reduce(_srcReducer2['default'], (0, _immutable.Map)());

    (0, _chai.expect)(finalState).to.equal((0, _immutable.fromJS)({
      winner: 'Trainspotting'
    }));
  });
});
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _chai = require('chai');

var _srcStore = require('../src/store');

var _srcStore2 = _interopRequireDefault(_srcStore);

var it = global.it;
var describe = global.describe;

describe('store', function () {
  it('is a Redux store configured with the correct reducer', function () {
    var store = (0, _srcStore2['default'])();
    (0, _chai.expect)(store.getState()).to.equal((0, _immutable.Map)());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    });

    (0, _chai.expect)(store.getState()).to.equal((0, _immutable.fromJS)({
      entries: ['Trainspotting', '28 Days Later']
    }));
  });
});
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiImmutable = require('chai-immutable');

var _chaiImmutable2 = _interopRequireDefault(_chaiImmutable);

_chai2['default'].use(_chaiImmutable2['default']);
