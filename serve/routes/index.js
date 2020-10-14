const router = require('koa-router')({
  prefix: '/api'
})

const userController = require('../controllers/user');
const todoController = require('../controllers/todo');
const okrController = require('../controllers/okr');
const objectiveController = require('../controllers/objective');
const keyresultController = require('../controllers/keyresult');
const todoKeyresultController = require('../controllers/todokeyresult');


router.post('/wx/login', userController.wxLogin)
router.post('/wx/todo',todoController.insert)
router.get('/wx/todo',todoController.index)
router.delete('/wx/todo',todoController.delete)
router.put('/wx/todo',todoController.updata)

router.get('/wx/todo/keyresult',todoKeyresultController.index)
router.post('/wx/todo/keyresult',todoKeyresultController.insert)
router.delete('/wx/todo/keyresult',todoKeyresultController.delete)

router.get('/wx/okr',okrController.index)
router.post('/wx/okr',okrController.insert)
router.put('/wx/okr',okrController.updata)

router.get('/wx/okr_edit',okrController.show)

router.delete('/wx/objective',objectiveController.delete)
router.put('/wx/objective',objectiveController.updata)

router.delete('/wx/keyresult',keyresultController.delete)
router.put('/wx/keyresult',keyresultController.updata)

module.exports = router