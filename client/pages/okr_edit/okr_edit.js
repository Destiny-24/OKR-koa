import okr from './../../models/okr.js';
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
    console.log(event)
    let index = event.currentTarget.dataset.index;
    let value = event.detail.value;
    let keyresults = this.data.keyresults;
    keyresults[index].title = value;
    this.setData({keyresults});
  },
  handleSubmit(event){
    // let objective = this.data.objective;
    // let keyresults = this.data.keyresults;
    // if(!objective || !keyresults.length ){
    //   wx.showToast({
    //     title:'缺少目标或成果',
    //     icon:'none',
    //     mask:true,
    //     duration:2000
    //   })
    //   return
    // };
    // let data = {objective,keyresults};
    // let token = wx.getStorageSync('token');
    // okr.updata({data,token}).then(res =>{
    //   wx.switchTab({url:'../okr/okr'})
    // })
  }
})