import User from '../../models/user';

Page({
  onLoad(){
    let token = wx.getStorageSync('token')
    if(token){
      wx.switchTab({
        url: '/pages/todo/todo',
      })
    }
  },
  handleLogin(){
   wx.login({
     success(res){
       if(res.code){
         User.login(res.code).then(res =>{
           let token = res.token;
           if(!token) return console.log('登录失败')
           wx.setStorage({key:'token',data:token})
           wx.switchTab({url:'/pages/todo/todo'})
         })
       }else{
         console.log('登录失败' +res.errMsg)
       }
     }
   })
  }
})