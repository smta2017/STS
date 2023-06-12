const Entry=require('../app/controllers/entry.controller')
const { auth, authToThisRoute } = require('../app/middlewares')
const router=require('express').Router()
router.post('/',/*auth,authToThisRoute,*/Entry.addEntry)
router.put('/:entryId/:competitorId',auth,/*authToThisRoute,*/Entry.addCompetitorToEntry)
router.delete('/:entryId/:competitorId',auth,/*authToThisRoute,*/Entry.removeCompetitorFromEntry)
router.get('/:subscriptionId',auth,/*authToThisRoute,*/Entry.allentries)

module.exports=router