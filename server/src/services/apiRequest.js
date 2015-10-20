import axios from 'axios';
import q from 'q';
import reqwest from 'reqwest';

const BASE_URL = 'http://liveproxy-rails-example.herokuapp.com';
// const BASE_URL = 'http://localhost:8092';
const API_PATH = 'api/v1';

function pathForResource(def) {
  const path = `${BASE_URL}/${API_PATH}/${def.keys.plural}`;
  console.log('Hitting API', path);
  return path;
}

export function fetch(action) {
  let deferred = q.defer();
  const { def } = action;

  axios
  .get(pathForResource(def))
  .then(res => { return deferred.resolve(res); })
  .catch(err => { return deferred.reject(err); });

  return deferred.promise;
}

export function create(action) {
  let deferred = q.defer();
  const { def } = action;
  const { payloadFormatter = doc => doc } = def;

  axios
  .post(pathForResource(def), payloadFormatter(action.doc))
  .then(res => { return deferred.resolve(res); })
  .catch(err => { return deferred.reject(err); });

  return deferred.promise;
}

export function destroy(action) {
  let deferred = q.defer();
  const { id, def } = action;

  reqwest({
    url: `${pathForResource(def)}/${id}`,
    type: 'json',
    method: 'delete',
    contentType: 'application/json',
    error(err) { return deferred.reject(err); },
    success(resp) { return deferred.resolve(resp); },
  });

  return deferred.promise;
}

export function patch(action) {
  let deferred = q.defer();
  const { def, doc } = action;

  axios
  .patch(`${pathForResource(def)}/${doc.id}`, action.doc)
  .then(res => { return deferred.resolve(res); })
  .catch(err => { return deferred.reject(err); });

  return deferred.promise;
}
