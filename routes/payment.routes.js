const Payment=require('../app/controllers/payment.controller')
const router=require('express').Router()
router.get('/clienttoken',Payment.creatPaypalToken)
module.exports=router



