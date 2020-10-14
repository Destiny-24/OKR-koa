const Todokeyresult = require('../models/todokeyresult');
const Objective = require('../models/objective');
const Keyresult = require('../models/keyresult');
const authCode = require('../utils/authCode');

const todoKeyresultController ={
  index:async(ctx,next)=>{
    try{
      let todo_id = ctx.request.query.id;
      let token = ctx.request.query.token;
      let userid = authCode(token,'DECODE');
      let user_id = userid.str
      let params = {
        user_id : user_id,
        status:0
      }
      let objectives = await Objective.select(params);
      let objective_ids = objectives.map(data =>data.id);
      let keyresults = await Keyresult.knex().whereIn('objective_id',objective_ids);
      let todokeyresult = await Todokeyresult.select({todo_id});
      let keyresult_ids = todokeyresult.map(data => data.keyresult_id);
      let okr = {};
      objectives.forEach(data =>{
        data.keyresults = [];
        okr[data.id] = data
      });
      keyresults.forEach(data =>{
        data.active = keyresult_ids.includes(data.id+'');
        okr[data.objective_id].keyresults.push(data)
      });
      okr = Object.values(okr)
      ctx.body ={
        code : 200,
        data : okr
      }
    }catch(e){
      console.log(e)
    }
  },
  insert:async(ctx,next)=>{
    try{
      console.log(ctx.request.body)
      let todo_id = ctx.request.body.todo_id;
      let keyresult_id = ctx.request.body.keyresult_id;
      await Todokeyresult.insert({todo_id,keyresult_id})
      ctx.body={
        code:200,
        message:'关联成功'
      }
    }catch(e){
      console.log(e)
      ctx.body={
        code:0,
        message:'服务器错误'
      }
    }
  },
  delete:async(ctx,next)=>{
    try{
      let todo_id = ctx.request.body.todo_id;
      let keyresult_id = ctx.request.body.keyresult_id;
      await Todokeyresult.insert({todo_id,keyresult_id}).del()
      ctx.body={
        code:200,
        message:'取消关联'
      }
    }catch(e){
      console.log(e)
    }
  }
}

module.exports = todoKeyresultController;