const subscriptionModel = require('../../db/models/subscription.model')
const Helper = require('../helper')
class Supscription {
    static addSubscription = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await req.user.populate('joinedCompetitions')
            if ((req.user.joinedCompetitions.findIndex(join => join.competition.toString() == req.params.compId)) >= 0) {
                const e = new Error('you already joined to this competition')
                e.name = 'Error'
                throw e
            }
            delete req.body.subscriptionDate
            if (true) { return subscriptionModel.create({ competition: req.params.compId, academy: req.user._id }) }
        }, 'congrats you have joined the competion successfully')
    }
    static getAllMySubscriptions=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return subscriptionModel.find({academy:req.user._id},['_id',"competition",]).populate("competition")
        },'there is all your subscription')
    }
   
}
module.exports = Supscription