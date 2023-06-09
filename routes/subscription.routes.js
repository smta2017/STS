const Subscription=require('../app/controllers/subscription.controller')
const {auth,authToThisRoute}=require('../app/middlewares')
const router=require('express').Router()
router.post('/:compId',auth/*,authToThisRoute*/,Subscription.addSubscription)
router.post('/competitor/:subscriptionId'/*,auth,authToThisRoute*/,Subscription.addCompetitor)
router.delete('/competitor/:subscriptionId/:competitorId'/*,auth,authToThisRoute*/,Subscription.removeCompetitor)
module.exports=router