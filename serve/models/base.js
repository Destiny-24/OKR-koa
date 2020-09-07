//基础模型
const knex = require('./knex')

class Base {
  constructor(props) {
    this.table = props;
  }
  knex() {
    return knex(this.table)
  }

  //全部
  all(){
    return knex(this.table).select()
  }
  //查找
  select(params){
    return knex(this.table).select().where(params)
  }
  //插入
  insert(params){
    return knex(this.table).insert(params)
  }
  //修改
  update(id,params){
    return knex(this.table).where('id','=',id).update(params)
  }
  //删除
  delete(id){
    return knex(this.table).where('id','=',id).delete()
  }
}
module.exports = Base