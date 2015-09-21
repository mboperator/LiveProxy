import axios from 'axios';
import q from 'q';

const BASE_URL = 'http://localhost:8091';
const API_PATH = 'api/mock';

function pathForResource(def) {
  return `${BASE_URL}/${API_PATH}/${def.keys.plural}`;
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

  axios
  .post(pathForResource(def), action.doc)
  .then(res => { return deferred.resolve(res); })
  .catch(err => { return deferred.reject(err); });

  return deferred.promise;
}

export function destroy(action) {
  let deferred = q.defer();
  const { id, def } = action;

  axios
  .delete(`${pathForResource(def)}/${id}`)
  .then(res => { return deferred.resolve(res); })
  .catch(err => { return deferred.reject(err); });

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
