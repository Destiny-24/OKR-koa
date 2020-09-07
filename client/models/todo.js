import API from './api.js';
import { request } from './request';

export default{
  insert(params){
    return request({url:API.todo, method:'POST',data:params})
  },
  index(params){
    return request({ url: API.todo, data:  params  })
  },
  updata(params){
    return request({url:API.todo,method:'PUT',data:{params}})
  },
  delete(params){
    return request({url:API.todo,method:'DELETE', data:params})
  }
}