import TodoKeyresult from '../../models/todo_keyresult'

Page({
  data:({
    okr:[]
  }),
  onLoad(optio){
    let id = optio.id
    let token = wx.getStorageSync('token');
    TodoKeyresult.index({id,token}).then(res =>{
      console.log(res)
      this.setData({id,okr:res});
    })
  },
  handleChange(event){
    console.log(event)
    let todo_id = this.data.id;
    let keyresult_id = event.currentTarget.dataset.keyresult_id;
    let active = event.currentTarget.dataset.active;
    let index =event.currentTarget.dataset.index;
    let objective_index = event.currentTarget.dataset.objective_index
    let changeActive = !active;
    let okr = this.data.okr
    if(changeActive){
      TodoKeyresult.insert({todo_id,keyresult_id}).then(res =>{
        okr[objective_index].keyresults[index].active = changeActive;
        this.setData({okr})
      })
    }else{
      TodoKeyresult.delete({todo_id,keyresult_id}).then(res =>{
        okr[objective_index].keyresults[index].active = changeActive;
        this.setData({okr})
      })
    }
  }
})