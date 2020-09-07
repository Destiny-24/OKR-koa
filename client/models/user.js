import API from './api.js';
import { request } from './request';

export default{
  login(code){
    return request({ url: API.login, method: 'POST', data: { code } })
  }
}