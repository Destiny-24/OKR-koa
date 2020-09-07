import Todo from './../../models/todo.js';
import { formatTime } from './../../utils/date.js';



Page({
  data:{
    todos:[],
    value:''
  },
  onShow(){
    let token = wx.getStorageSync('token');
    Todo.index({status:0,token}).then(res =>{
      this.setData({todos:res})
    })
  },
  handleInput(event){
    let value = event.detail.value;
    this.setData({value});
  },
  handleConfirm(event){
    let title = event.detail.value;
    let token = wx.getStorageSync('token');
    Todo.insert({title,token}).then(res =>{
      let created_time = formatTime(new Date())
      let id = res;
      let todos = this.data.todos;
      todos.push({id,title,created_time})
      this.setData({value:'',todos})
    })
  },
  handleShowActionSheet(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['关联','完成','删除'],
      itemColor: '#333',
      success:(res) =>{
        let tapIndex = res.tapIndex;
        switch (tapIndex){
          case 0:
            wx.navigateTo({url:'/client/pages/todo_keyresult/todo_keyresult?id='+id})
            break;
          case 1:
            this.handleFinishTodo(id,index)
            break;
          case 2:
            wx.showModal({
              title:'删除',
              content:'是否确认删除todo',
              success:(res)=>{
                console.log(res)
                if(res.confirm){
                  this.handleDeleteTodo(id,index)
                }else{
                  wx.showToast({
                    title: '已取消删除'
                  })
                }
              }
            })
          break;   
        }
      }
    })
  },
  handleDeleteTodo(id,index){
    Todo.delete({id}).then(res =>{
      let todos = this.data.todos;
      todos.splice(index,1)
      this.setData({todos})
      wx.showToast({
        title: '已删除'
      })
    })
  },
  handleFinishTodo(id,index){
    Todo.updata({id,status:1}).then(res =>{
      let todos = this.data.todos;
      todos.splice(index,1);
      this.setData({todos})
      wx.showToast({
        title: '已完成'
      })
    })
  }
})