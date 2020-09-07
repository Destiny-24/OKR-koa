import Todo from './../../models/todo.js';

Page({
  data:{
    todos:[]
  },
  onShow(){
    let token = wx.getStorageSync('token');
    Todo.index({status:1,token}).then(res =>{
      this.setData({todos:res})
    })
  },
  handleShowActionSheet(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['标记为未完成','删除'],
      itemColor: '#333',
      success:(res)=>{
        let tapIndex = res.tapIndex;
        switch(tapIndex){
          case 0:
          this.handleChangeTodo(id,index);
          break;
          default :
            wx.showModal({
              title:'删除',
              content:'是否确认删除todo',
              success:(res)=>{
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
  handleChangeTodo(id,index){
    Todo.updata({id,status:0,completed_time: null}).then(res =>{
      let todos = this.data.todos;
      todos.splice(index,1);
      this.setData({todos})
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
  }
})