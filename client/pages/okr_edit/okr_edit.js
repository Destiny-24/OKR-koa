import okr from './../../models/okr';
import keyresult from './../../models/keyresult';

Page({
  data:{
    objective:'',
    keyresults:[]
  },
  onLoad(option){
    let id = option.id;
    let token = wx.getStorageSync('token');
    okr.show({id,token}).then(res =>{
      let objective = res.objectives[0].title;
      let keyresults = res.keyresults;
      this.setData({objective,keyresults})
    })
  },
  handleChangeObjective(event) {
    let value = event.detail.value;
    this.setData({ objective: value })
  },
  handleAddKeyresult(event){
    let keyresults = this.data.keyresults;
    keyresults.push({title: ''})
    this.setData({ keyresults })
  },
  handleDeleteKeyresult(event){
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
    keyresult.delete({id}).then(res =>{
      keyresults.splice(index,1);
      this.setData({keyresults})
    })
  },
  handleChangeKeyresult(event){
    let index = event.currentTarget.dataset.index;
    let value = event.detail.value;
    let keyresults = this.data.keyresults;
    keyresults[index].title = value;
    this.setData({keyresults});
  },
  handleSubmit(event){
    let objective = this.data.objective;
    let keyresults = this.data.keyresults;
    let id = this.options.id;
    if(!objective || !keyresults.length ){
      wx.showToast({
        title:'缺少目标或成果',
        icon:'none',
        mask:true,
        duration:2000
      })
      return
    };
    let tmp = keyresults.every(data => data.title);
    if(!tmp){
      wx.showToast({
        title:'请输入成果',
        icon:'none',
        mask:true,
        duration:2000
      })
      return
    }
    let data = {title:objective};
    data.keyresults = keyresults
    let token = wx.getStorageSync('token');
    okr.updata({id,data,token}).then(res =>{
      wx.switchTab({url:'../okr/okr'});
      wx.showToast({
        title:'保存成功'
      });
    })
  }
})