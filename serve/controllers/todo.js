const Todo = require('./../models/todo');
const formate = require('./../utils/date');
const authCode = require('./../utils/authCode')

const todoController = {
  insert: async (ctx,next)=>{
    try{
      let title = ctx.request.body.title;
      let token = ctx.request.body.token;
      let suerid = authCode(token,'DECODE')
      let user_id = suerid.str
      let status = 0;
      let created_time = new Date();
      if(!title || !user_id){
        return  ctx.body={ message:'缺少code参数' }
      }
      let todos = await Todo.insert({title,user_id,status,created_time});
      let id = todos[0]
      ctx.body={
        code:200,
        data:id
      }
    }catch(e){
      console.log(e)
      ctx.body={
        code:0,
        message: '服务器出错'
      }
    }
  },
  index:async(ctx,next)=>{
    try{
      let status = ctx.request.query.status;
      let token = ctx.request.query.token;
      let suerid = authCode(token,'DECODE')
      let user_id = suerid.str
      if(!user_id){
        return ctx.body={ message:'缺少用户参数'}
      }
      let todos = await Todo.select({user_id,status});
      todos = todos.map(data =>{
        data.created_time = formate.formatTime(data.created_time);
        if(data.completed_time){
          data.completed_time = formate.formatTime(data.completed_time)
        }
        return data
      })
      ctx.body={
        code:200,
        data:todos
      }
    }catch(e){
      console.log(e)
    }
  },
  delete:async(ctx,next) =>{
    let id = ctx.request.body.id
    await Todo.delete(id);
    ctx.body={
      code:200,
      message:'success'
    }
  },
  updata:async(ctx,next) =>{
    let id = ctx.request.body.params.id;
    let status = ctx.request.body.params.status;
    let completed_time = status ? new Date() : null;
    await Todo.update(id,{status,completed_time});
    ctx.body={
      code:200,
      message:'success'
    }
  }
}

module.exports = todoController;