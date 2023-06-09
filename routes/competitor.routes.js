const Competitor=require('../app/controllers/competitors.controller')
const router=require('express').Router()

router.post('/'/*,auth,authToThisRoute*/,Competitor.addCompetitor)
router.get('/:subscriptionId'/*,auth,authToThisRoute*/,Competitor.getThisSubscriptionCompetitors)
router.delete('/:competitorId'/*,auth,authToThisRoute*/,Competitor.removeCompetitor)
router.put('/:competitorId'/*,auth,authToThisRoute*/,Competitor.editCompetitor)
module.exports=router