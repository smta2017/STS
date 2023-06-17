const Advertising = require('../app/controllers/advertising.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router = require('express').Router()
router.post('/',/*auth,authToThisRoute,*/Advertising.add)
router.put('/:id',/*auth,authToThisRoute,*/Advertising.update)
router.delete('/:id',/*auth,authToThisRoute,*/Advertising.delete)
router.get('/all',/*auth,authToThisRoute,*/Advertising.getAll)
module.exports = router