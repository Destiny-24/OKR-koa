import API from './api.js';
import { request } from './request.js';

export default {
  index (params) {
    return request({ url: API.okr, data: params})
  },
  insert (params) {
    return request({ url: API.okr, method: 'POST', data: params })
  },
  updata(params){
    return request({url:API.okr,method:'PUT',data:{params}})
  },
  show(params){
    return request({url:API.okr_edit, data:params})
  }
}