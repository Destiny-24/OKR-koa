const config = require('./../config');
const axios = require('axios');
const APPID = config.appid;
const SECRET = config.secret;

const LoginAPI = function(APPID,SECRET,JSCODE){
  return `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
}
class Weixin{
  code2Session(code){
    let api_url = LoginAPI(APPID,SECRET,code);
    return axios.get(api_url)
  }
}
module.exports = new Weixin()