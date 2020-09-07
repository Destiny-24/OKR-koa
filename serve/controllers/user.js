const User = require('./../models/user')
const Weixin = require('./../models/weixin')
const authCode = require('./../utils/authCode')
const userControllers = {
  wxLogin: async (ctx, next) => {
    try{
      let code = ctx.request.body.code
      if(!code){
        return ctx.body = { message:'缺少code参数' }
      }
      let weixinRequest = await Weixin.code2Session(code);
      let weixinData = weixinRequest.data;
      let open_id = weixinData.openid
      let users = await User.select({open_id})
      let user = users[0];
      let user_id;
      if(!user){
        let ids = await User.insert({open_id})
        user_id = ids[0]
      }else{
        user_id = user.id;
      }
      let token = authCode(user_id,'ENCODE')
      ctx.body={
        code: 200,
        data: {token}
      }
    }catch(e){
      console.log(e)
      ctx.body={
        code: 0,
        message: '服务器错误'
      }
    }
  } 
}
module.exports = userControllers