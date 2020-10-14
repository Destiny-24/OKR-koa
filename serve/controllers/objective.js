const Objective = require('../models/objective');
const Keyresult = require('../models/keyresult');
const authCode = require('./../utils/authCode');

const objectiveControoler = {
  updata: async(ctx,netx)=>{
    try{
      let id = ctx.request.body.id;
      let params = ctx.request.body.params;
      params.completed_time = params.status ? new Date() : null;
      await Objective.update(id,params);
      ctx.body={
        code:200,
        message:'success'
      }
    }catch(e){
      console.log(e)
    }
  },
  delete: async(ctx,netx)=>{
    try{
      console.log(ctx.request.body)
      let id = ctx.request.body.params.id;
      let token = ctx.request.body.params.token;
      let suerid = authCode(token,'DECODE');
      let user_id = suerid.str;
      let objective_id = id;
      if(!user_id){
        return ctx.body={ message:'缺少用户参数'}
      }
      await Objective.select({id}).delete();
      await Keyresult.select({objective_id}).delete();
      ctx.body={
        code:200,
        message:'success'
      }
    }catch(e){
      console.log(e)
    }
  }
}
module.exports = objectiveControoler