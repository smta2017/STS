const subscriptionModel = require('../../db/models/subscription.model')
const countryCodeslist = require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
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
    static addCompetitor = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId,null, subscriptionModel, 'subscription')
            req.body.mobileNumber = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
            subscription.competitors.push(req.body)
            if (true) {
                return subscription.save()
            }
        }, 'your competitor was added successfully')
    }
    static removeCompetitor = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId,null, subscriptionModel, 'subscription')
            const i = subscription.competitors.findIndex(competitor => competitor._id.toString() == req.params.competitorId)
            if (i < 0) {
                const e = new Error("the academy competitor list don't include this competitor")
                e.name = 'CastError'
                throw e
            }
            subscription.competitors.splice(i, 1)
            if(true){
               return subscription.save() 
            }
        }, 'competitor was removed successfully')
    }
    static getThisSubscriptionCompetitors=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return Helper.isThisIdExistInThisModel(req.params.subscriptionId,['competitors'],subscriptionModel,'subscription')
        },'there are all your subscription')
    }
}
module.exports = Supscription