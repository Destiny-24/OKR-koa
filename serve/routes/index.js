const router = require('koa-router')({
  prefix: '/api'
})

// const testController = require('../controllers/test.js')
const userController = require('../controllers/user');
const todoController = require('../controllers/todo');
const okrController = require('../controllers/okr');
const keyresultController = require('../controllers/keyresult');
// const cors = require('../middlewares/cors')

// router.get('/test', testController.test)
router.post('/wx/login', userController.wxLogin)
router.post('/wx/todo',todoController.insert)
router.get('/wx/todo',todoController.index)
router.delete('/wx/todo',todoController.delete)
router.put('/wx/todo',todoController.updata)
router.get('/wx/okr',okrController.index)
router.post('/wx/okr',okrController.insert)
router.put('/wx/okr',okrController.updataComplete)
router.delete('/wx/okr',okrController.delete)
router.get('/wx/okr_edit',okrController.show)

router.delete('/wx/keyresult',keyresultController.delete)
router.put('/wx/keyresult',keyresultController.updata)

module.exports = router