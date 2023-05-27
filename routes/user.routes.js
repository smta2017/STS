const User=require('../app/controller/user.controller')
const router=require('express').Router()
router.post('/',User.academyRegistration)
router.post('/login',User.login)
module.exports=router
