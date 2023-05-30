const News=require('../app/controllers/news.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router=require('express').Router()
router.post('/',/*auth,authToThisRoute,*/News.add)
router.put('/:id',/*auth,authToThisRoute,*/News.update)
router.delete('/:id',/*auth,authToThisRoute,*/News.delete)
router.get('/all',/*auth,authToThisRoute,*/News.getAll)
module.exports=router