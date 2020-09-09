import Okr from '../../models/okr'
Page({
  data:{
    objective:'',
    keyresult:[{
      title:''
    }]
  },
  handleChangeKeyresult(event){
    let index = event.currentTarget.dataset.index;
    let value = event.detail.value;
    let keyresult = this.data.keyresult;
    keyresult[index].title = value;
    this.setData({keyresult})
  },
  handleChangeObjective(event){
    let value = event.detail.value;
    this.setData({ objective: value })
  },
  handleAddKeyresult(){
    let keyresult = this.data.keyresult;
    keyresult.push({title:''});
    this.setData({keyresult})
  },
  handleDeleteKeyresult(event){
    let index = event.currentTarget.dataset.index;
    let keyresult = this.data.keyresult;
    keyresult.splice(index,1);
    this.setData({keyresult})
  },
  handleSubmit(event){
    let objective = this.data.objective;
    let keyresult = this.data.keyresult;
    if(!objective || !keyresult.length ){
      wx.showToast({
        title:'缺少目标或成果',
        icon:'none',
        mask:true,
        duration:2000
      })
      return
    };
    let data = {objective,keyresult};
    let token = wx.getStorageSync('token');
    Okr.insert({data,token}).then(res =>{
      wx.switchTab({url:'../okr/okr'})
    })
  }
})