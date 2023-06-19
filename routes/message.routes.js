const Message = require('../app/controllers/message.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router = require('express').Router()
router.post('/',Message.add)
router.post('/inside',auth,/*authToThisRoute,*/Message.add)
router.delete('/:id',/*auth,authToThisRoute,*/Message.delete)
router.get('/all',/*auth,authToThisRoute,*/Message.getAll)
module.exports = router