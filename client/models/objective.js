import { request } from './request.js';
import API from './api.js';

export default {
  delete (params) {
    return request({ url: API.objective, method: 'DELETE', data: {params}})
  },
  update (id,params) {
    return request({ url: API.objective, method: 'PUT', data: {id,params} })
  },
}