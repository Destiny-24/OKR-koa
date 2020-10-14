import { request } from './request.js';
import API from './api.js';

export default{
  index (params) {
    return request({ url: API.todoKeyresult, data:  params })
  },
  insert (params) {
    return request({ url: API.todoKeyresult, method: 'POST', data: params })
  },
  delete (params) {
    return request({ url: API.todoKeyresult, method: 'DELETE', data: params})
  },
}