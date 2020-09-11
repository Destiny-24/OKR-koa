import okr from './../../models/okr.js'

Page({
  data:{
    objectives: []
  },
  onShow(){
    let token = wx.getStorageSync('token');
    okr.index({ status:0,token }).then(res =>{
      this.setData({objectives:res})
    })
  },
  handleShowActionSheet(event){
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    let status = event.currentTarget.dataset.status;
    wx.showActionSheet({
      itemList: ['查看','编辑','标记完成','删除'],
      itemColor: '#333',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        switch(tapIndex){
          case 0:
            wx.navigateTo({url:'../okr_detail/okr_detail?id='+id});
          break;
          case 1:
            wx.navigateTo({url:'../okr_edit/okr_edit?id='+id});
          break;
          case 2:
            this.handleChangeObjective({id,status});
          break;
          case 3:
            wx.showModal({
              title:'提示',
              content:'是否确定删除',
              success:(res) =>{
                if(res.confirm){
                  this.handleDeleteObjective(id,index)
                }
              }
            })
          break;
        }
      }
    })
  },
  handleChangeObjective({id,status}){
    okr.updata({id,status}).then(res =>{
      let token = wx.getStorageSync('token');
      okr.index({ status:0,token }).then(res =>{
        this.setData({objectives:res})
      })
    })
  },
  handleDeleteObjective(id,index){
    let token = wx.getStorageSync('token');
    okr.delete({id,token}).then(res =>{
      let objectives = this.data.objectives;
      objectives.splice(index,1)
      this.setData({ objectives })
    })
  }
})