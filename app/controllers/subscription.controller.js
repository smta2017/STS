const subscriptionModel = require('../../db/models/subscription.model')
const competitionModel = require('../../db/models/competition.model')
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
            const competition=await Helper.isThisIdExistInThisModel(req.params.compId,null,competitionModel,'competition')
            if(competition.type=='final'){
                const qualifierOfTheSameYear=await competitionModel.findOne({country:req.user.country,type:'qualifier',year:competition.year}).populate('joins')
                const hisQualifierSubscription=qualifierOfTheSameYear.joins.find(join=>join.academy=req.user._id)
                const finalSubscription=await subscriptionModel.create({ competition: req.params.compId, academy: req.user._id })
                const competitors=await competitionModel.find({qualifierSubscription:hisQualifierSubscription})
                await Promise.all(competitors.map(competitor=>{
                    competitor.finalSubscription=finalSubscription
                    competitor.save()
                }))
                const entries=await competitionModel.find({qualifierSubscription:hisQualifierSubscription})
                await Promise.all(entries.map(entry=>{
                    entry.finalSubscription=finalSubscription
                    entry.save()
                }))
                return finalSubscription
            }else{
                delete req.body.subscriptionDate
                return subscriptionModel.create({ competition: req.params.compId, academy: req.user._id })
            }
        }, 'congrats you have joined the competition successfully')
    }
    static getAllMySubscriptions=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return subscriptionModel.find({academy:req.user._id},['_id',"competition",]).populate("competition")
        },'there is all your subscription')
    }
   
}
module.exports = Supscription