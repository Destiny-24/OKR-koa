const Keyresult = require('./../models/keyresult')

const keyresultController = {
  delete:async (ctx,next)=>{
    try{
      let id = ctx.request.body.params.id;
      await Keyresult.select({id}).delete()
      ctx.body={
        code:200,
        message:'success'
      }
    }catch(e){
      console.log(e)
    }
  },
  updata:async (ctx,next)=>{
    try{
      let id = ctx.request.body.params.id;
      let status = ctx.request.body.params.status;
      let completed_time= status ? new Date() : null;
      await Keyresult.select({id}).update({status,completed_time})
      ctx.body= {
        code:200,
        message:'success'
      }
    }catch(e){
      console.log(e)
    }
  }
}
module.exports = keyresultController;
