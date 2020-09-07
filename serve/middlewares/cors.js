const cors = {
  allowAll: async function(ctx, next){
      ctx.set('Acess-Control-Allow-Origin','*');
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      ctx.set('Access-Control-Allow-Credentials', 'true');
      await next()
  }
}

module.exports = cors;