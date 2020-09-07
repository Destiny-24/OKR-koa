import { request } from './request.js';
import API from './api.js';

export default {
  index (params) {
    return request({ url: API.keyresult, data:  params })
  },
  insert (params) {
    return request({ url: API.keyresult, method: 'POST', data: params })
  },
  delete (params) {
    return request({ url: API.keyresult, method: 'DELETE', data: params})
  },
}