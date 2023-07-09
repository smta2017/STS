const Country = require('../app/controllers/country.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router = require('express').Router()
router.post('/',/*auth,authToThisRoute,*/Country.add)
router.put('/:id',/*auth,authToThisRoute,*/Country.update)
router.delete('/:id',/*auth,authToThisRoute,*/Country.delete)
router.get('/all',/*auth,authToThisRoute,*/Country.getAll)
router.get('/allaccessable',/*auth,authToThisRoute,*/Country.getAllAcessable)
module.exports = router