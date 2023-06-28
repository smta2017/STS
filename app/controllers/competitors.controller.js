const competitionModel = require('../../db/models/competition.model')
const competitorModel = require('../../db/models/competitor.model')
const entryModel = require('../../db/models/entry.model')
const subscriptionModel = require('../../db/models/subscription.model')
const moment = require('moment')
const countryCodeslist = require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
const Helper = require('../helper')
class Competitor {
    static addCompetitor = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const competitionType = (await Helper.isThisIdExistInThisModel(req.body.qualifierSubscription, ['competition'], subscriptionModel, 'subscription', 'competition')).competition.type
            if (competitionType == 'final') {
                if (req.user.role.toString() == '6480d5701c02f26cd6668987') {
                    const e = new Error('you can not add new entry that did not take apart in the qualifier')
                    e.name = 'Error'
                    throw e
                } else {
                    req.body.finalSubscripyion = req.body.qualifierSubscription
                }
            }
            await req.user.isThisSubscriptionBelongToMe(req.body.qualifierSubscription)
            if (!req.body.countryCallingCode) {
                const e = new Error('we need you country calling code with your phone number to complete this registeration')
                e.name = 'ValidationError'
                throw e
            }
            req.body.mobileNumber = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
            return competitorModel.create(req.body)
        }, 'your competitor was added successfully')
    }
    static removeCompetitor = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const competitor = await Helper.isThisIdExistInThisModel(req.params.competitorId, null, competitorModel, 'competitor', { path: 'finalSubscription', populate: 'competition' })
            if (competitor.finalSubscription && competitor.finalSubscription.competition.type == 'final' && req.user.role.toString() == '6480d5701c02f26cd6668987') {
                const e = new Error('you can not delete this competitor right now ,please contact us for any questions')
                e.name = 'Error'
                throw e
            }
            await req.user.isThisSubscriptionBelongToMe(competitor.qualifierSubscription._id)
            const result = await competitorModel.findByIdAndDelete(req.params.competitorId)
            // const result= await Helper.isThisIdExistInThisModel(req.params.competitorId,null,competitorModel,'competitor')
            const entries = await entryModel.find({ qualifierSubscription: result.qualifierSubscription, competitors: req.params.competitorId })
            await Promise.all(entries.map(entry => {
                const i = entry.competitors.findIndex(competitor => competitor == req.params.competitorId)
                entry.competitors.splice(i, 1)
                entry.save()
            }))
            if (true) {
                return result
            }
        }, 'competitor was removed successfully')
    }
    static getThisSubscriptionCompetitors = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await req.user.isThisSubscriptionBelongToMe(req.params.subscriptionId)
            const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId, ['competition'], subscriptionModel, 'subscription', 'competition')
            const filter = {}
            filter[subscription.competition.type + 'Subscription'] = req.params.subscriptionId
            if (true) { return competitorModel.find(filter) }
        }, 'there are all your subscription')
    }
    static getThisSubscriptionCompetitorsByCategory = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await req.user.isThisSubscriptionBelongToMe(req.params.subscriptionId)
            const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId, ['competition'], subscriptionModel, 'subscription', 'competition')
            const filter = {}
            filter[subscription.competition.type + 'Subscription'] = req.params.subscriptionId
            filter.category = req.params.category
            if (true) { return competitorModel.find(filter) }
        }, 'there are all your subscription')
    }
    static editCompetitor = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const competitor = await Helper.isThisIdExistInThisModel(req.params.competitorId, null, competitorModel, 'competitor', { path: 'finalSubscription', populate: 'competition' })
            if (competitor.finalSubscription && competitor.finalSubscription.competition.type == 'final' && req.user.role.toString() == '6480d5701c02f26cd6668987') {
                const e = new Error('you can not delete this competitor right now ,please contact us for any questions')
                e.name = 'Error'
                throw e
            }
            await req.user.isThisSubscriptionBelongToMe(competitor.qualifierSubscription._id)
            for (let field in req.body) {
                if (field == 'mobileNumber' && req.body[field]) {
                    if (req.body.countryCallingCode) {
                        competitor[field] = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
                    } else {
                        const e = new Error('we need the competitor country calling code to change his mobile number')
                        e.name = 'CastError'
                        throw e
                    }
                }
                if (!['gender', 'category', 'mobileNumber'].includes(field) && req.body[field]) { competitor[field] = req.body[field] }
            }
            if (true) { return competitor.save() }
        }, 'competitor was edited successfully')
    }
    static getAllCompetitionCompetitors = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const allCompetitonSubscripetition = await subscriptionModel.find({ competition: req.params.compId }, ['_id', 'competiton']).populate('competition')
            if (allCompetitonSubscripetition.length <= 0) {
                const e = new Error('there is no acaedmy joins this competition')
                e.name = 'Error'
                throw e
            }
            const subscriptionArray = allCompetitonSubscripetition.map(sub => sub._id)
            const filter = {}
            filter[allCompetitonSubscripetition[0].competition.type + 'Subscription'] = { $in: subscriptionArray }
            if (true) { return competitorModel.find(filter).populate({path:'qualifierSubscription',select:['academy'],populate:{path:'academy',select:['academyDetails'],populate:{path:'academyDetails',select:['schoolName']}}}) }
        }, 'there are all this competition entries')
    }
    // static updateFieldNameInAllDocs=(req,res)=>{
    //     Helper.handlingMyFunction(req,res,async(req)=>{
    //         // const allSubscriptions=await subscriptionModel.find()
    //         // const subscriptionsID=allSubscriptions.map(sub=>sub._id)
    //         // console.log(subscriptionsID)
    //         // // if(true){return subscriptionsID}
    //         // if(true){return competitorModel.deleteMany({qualifierSubscription:{$nin:subscriptionsID}})}
    //        const allCompetitors=await competitorModel.find()
    //       const a=  await Promise.all(allCompetitors.map(comp=>{
    //         comp.passedQualifiers=comp.passQualifier
    //         comp.passQualifier=undefined
    //        return comp.save()
    //        }))
    //        if(true){
    //         return competitorModel.updateMany
    //        }
    //     },'fieldname update successfully')
    // }
}

module.exports = Competitor