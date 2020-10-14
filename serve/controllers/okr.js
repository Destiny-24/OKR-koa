const objective = require('./../models/objective')
const formate = require('./../utils/date');
const authCode = require('./../utils/authCode');
const Keyresult = require('./../models/keyresult');
const TodoKeyresult = require('./../models/todokeyresult');

const okrController = {
  index: async(ctx,next )=>{
    try{
      let token = ctx.request.query.token;
      let suerid = authCode(token,'DECODE')
      let user_id = suerid.str
      if(!user_id){
        return ctx.body={ message:'缺少用户参数'}
      }
      let objectives = await objective.select({user_id});
      objectives.forEach(data =>{
        data.created_time = formate.formatTime(data.created_time);
        if(data.completed_time){
          data.completed_time = formate.formatTime(data.completed_time)
        };
      });
      ctx.body={
        code:200,
        data:objectives
      }
    }catch(e){
      console.log(e)
    }
  },
  show:async(ctx,next)=>{
    try{
      let id = ctx.request.query.id;
      let token = ctx.request.query.token;
      let suerid = authCode(token,'DECODE')
      let user_id = suerid.str;
      let objective_id = id
      if(!user_id){
        return ctx.body={ message:'缺少用户参数'}
      }
      let objectives = await objective.select({id});
      objectives.forEach(data =>{
        data.created_time = formate.formatTime(new Date());
        if(data.completed_time){
          data.completed_time = formate.formatTime(data.completed_time)
        }
      })
      let keyresults = await Keyresult.select({objective_id})
      let keyresult_ids = keyresults.map(data => data.id )
      let todoKeyresults = await TodoKeyresult.knex()
      .whereIn('keyresult_id',keyresult_ids)
      // todo:副表， todo_keyresult.todo_id:todo_keyresult表里todo.id todo.id:todo表里的id
      .leftJoin('todo','todo_keyresult.todo_id','todo.id')
      .select({id: 'todo.id'},'todo_keyresult.keyresult_id','todo.title','todo.status')
      let keyresultTmp = {}
      keyresults.forEach(data=>{
        data.todos=[]
        keyresultTmp[data.id] = data;
      })
      todoKeyresults.forEach(data =>{
        keyresultTmp[data.keyresult_id].todos.push(data)
      })

      objectives[0].keyresults = Object.values(keyresults)
        console.log(objectives)
      ctx.state = {
        code: 200,
        data: objectives
      }
    }catch(e){
      console.log(e)
    }
  },
  //okr cerate新增目标
  insert:async (ctx,next)=>{
    try{
      let title = ctx.request.body.data.objective;
      let keyresult = ctx.request.body.data.keyresult;
      let token = ctx.request.body.token;
      let suerid = authCode(token,'DECODE');
      let user_id = suerid.str;
      let status = 0;
      let created_time = new Date();
      if(!title || !keyresult.length || !user_id){
        return ctx.body={ message:'缺少必要参数'}
      }
      let objectives =await objective.insert({
        title,
        user_id,
        status,
        created_time
      });
      let objective_id = objectives[0];
      keyresult.forEach(async (data)=>{
        let title = data.title;
        await Keyresult.insert({
          objective_id,
          title, 
          status,
          created_time
        })
      })
      ctx.body={
        code:200,
        message:'succsse'
      };
    }catch(e){
      console.log(e)
    };
  },
  updata: async(ctx,next) =>{
   try{
    let id = ctx.request.body.params.id;
    let title = ctx.request.body.params.data.title;
    let keyresults = ctx.request.body.params.data.keyresults
    let token = ctx.request.body.params.token;
    let created_time = new Date();
    let suerid = authCode(token,'DECODE')
    let user_id = suerid.str;
    let params = {title,created_time}
    if(!user_id){
      return ctx.body={ message:'缺少用户参数'}
    }
    await objective.update(id,params);
    keyresults.forEach(async(data)=>{
      if(data.id){
        await Keyresult.update(data.id,{title:data.title})
      }else{
        await Keyresult.insert({objective_id:id,title:data.title,status:0,created_time})
      }
    })
    ctx.body={
      code:200,
      message:'success'
    }
   }catch(e){
     console.log(e)
   }
  },
}
module.exports = okrController;