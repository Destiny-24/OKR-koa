//目标表
const Base = require('./base');

class Objective extends Base{
  constructor(props = 'objective'){
    super(props)
  }
}
module.exports = new Objective()