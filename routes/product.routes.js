const Product = require('../app/controllers/product.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router = require('express').Router()
router.post('/',/*auth,authToThisRoute,*/Product.add)
router.put('/:id',/*auth,authToThisRoute,*/Product.update)
router.delete('/:id',/*auth,authToThisRoute,*/Product.delete)
router.get('/:countryId',/*auth,authToThisRoute,*/Product.getAll)
module.exports = router