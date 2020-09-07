//代办事项表
const Base = require('./base');

class Todo extends Base{
  constructor(props = 'todo'){
    super(props)
  }
}
module.exports = new Todo()