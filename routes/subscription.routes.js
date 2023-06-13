const Subscription=require('../app/controllers/subscription.controller')
const {auth,authToThisRoute}=require('../app/middlewares')
const router=require('express').Router()
router.post('/:compId',auth/*,authToThisRoute*/,Subscription.addSubscription)
router.get('/',auth/*,authToThisRoute*/,Subscription.getAllMySubscriptions)
router.get('/:compId',auth/*,authToThisRoute*/,Subscription.getAllSubscriptionsForCompetition)
module.exports=router