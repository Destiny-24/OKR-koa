const Objective = require('./../models/objective')
const formate = require('./../utils/date');
const authCode = require('./../utils/authCode');
const Keyresult = require('./../models/keyresult')

const okrController = {
  index: async(ctx,next )=>{
    try{
      let status = ctx.request.query.status;
      let token = ctx.request.query.token;
      let suerid = authCode(token,'DECODE')
      let user_id = suerid.str
      if(!user_id){
        return ctx.body={ message:'缺少用户参数'}
      }
      let objectives = await Objective.select({user_id,status});
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
      let objectives =await Objective.insert({
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
  //okr 编辑
  updata: async(ctx,next) =>{
   try{
     let id = ctx.request.body.params.id;
     let status = 1;
     let completed_time = new Date();
     await Objective.update(id,{status,completed_time});
     ctx.body={
       code:200,
       message:'success'
     }
   }catch(e){
     console.log(e)
   }
  }
}
module.exports = okrController;