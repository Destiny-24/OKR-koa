import { request } from './request.js';
import API from './api.js';

export default {
  delete (params) {
    return request({ url: API.keyresult, method: 'DELETE', data: {params}})
  },
  update (params) {
    return request({ url: API.keyresult, method: 'PUT', data: {params} })
  },
}