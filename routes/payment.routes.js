const Payment=require('../app/controllers/payment.controller')
const {auth}=require('../app/middlewares')
const router=require('express').Router()
router.get('/clienttoken',Payment.creatPaypalToken)
router.post('/paypal/:subscriptionId',auth,Payment.paypalCheckout)
router.post('/bankreceipt/:subscriptionId',auth,Payment.addBankReceipt)
router.put('/bankreceipt/:paymentId',auth,Payment.determineBankReiceiptStatus)
router.get('/:subscriptionId',auth,Payment.getSubscriptionPayments)
module.exports=router



