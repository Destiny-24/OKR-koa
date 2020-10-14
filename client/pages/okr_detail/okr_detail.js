
import okr from './../../models/okr'
import Keyresult from '../../models/keyresult'
import Objective from '../../models/objective'

Page({
  data:{
    objective:[]
  },
  onLoad(option){
    let id = option.id;
    let token = wx.getStorageSync('token');
    okr.show({id,token}).then(res =>{
     let objective = res[0];
     this.setData({objective})
    })
  },
  handleObjectiveActionSheet(event){
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let statusChange = status ? 0 :1 ;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';
    wx.showActionSheet({
      itemList:[statusChangeDisplay,'删除'],
      itemColor: '#333',
      success:(res =>{
        let tapIndex = res.tapIndex;
        switch (tapIndex){
          case 0:
            Objective.update(id,{status:statusChange}).then(res =>{
              let objective = this.data.objective;
              objective.status = statusChange
              this.setData({objective})
            })
          break;
          case 1:
            let token = wx.getStorageSync('token');
            Objective.delete({id,token}).then(res =>{
              wx.showToast({
                title:'删除成功',
                duration:2000,
              })
              wx.switchTab({url:'../okr/okr'})
            })
          break  
        }
      })
    })
  },

  handleKeyresultActionSheet(event){
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';
    wx.showActionSheet({
      itemList:[statusChangeDisplay,'删除'],
      itemColor:'#333',
      success:(res)=>{
        console.log(res,22)
        let tapIndex = res.tapIndex;
        console.log(res)
        switch (tapIndex){
          case 0:
            Keyresult.update({id,status:statusChange}).then(() =>{
              let keyresult = this.data.objective.keyresults[index];
              keyresult.status = statusChange
              let objective = this.data.objective
              this.setData({objective})
            });  
          break
          case 1:
            Keyresult.delete({id}).then(() =>{
              let keyresults = this.data.keyresults;
              keyresults.splice(index,1)
              this.setData({keyresults})
              wx.showToast({
                title:'删除成功',
                duration:2000,
              })
            })
          break    
        }
      }
    })
  }
})

