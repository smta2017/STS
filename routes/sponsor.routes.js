const Sponsor=require('../app/controllers/sponsor.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router=require('express').Router()
router.post('/',/*auth,authToThisRoute,*/Sponsor.add)
router.put('/:id',/*auth,authToThisRoute,*/Sponsor.update)
router.delete('/:id',/*auth,authToThisRoute,*/Sponsor.delete)
router.get('/all',/*auth,authToThisRoute,*/Sponsor.getAll)
module.exports=router