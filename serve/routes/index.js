const router = require('koa-router')({
  prefix: '/api'
})

// const testController = require('../controllers/test.js')
const userController = require('../controllers/user.js');
const todoController = require('../controllers/todo');

// const cors = require('../middlewares/cors')

// router.get('/test', testController.test)
router.post('/wx/login', userController.wxLogin)
router.post('/wx/todo',todoController.insert)
router.get('/wx/todo',todoController.index)
router.delete('/wx/todo',todoController.delete)
router.put('/wx/todo',todoController.updata)

module.exports = router