const subscriptionModel = require('../../db/models/subscription.model')
const competitionModel = require('../../db/models/competition.model')
const Helper = require('../helper')
const entryModel = require('../../db/models/entry.model')
const competitorModel = require('../../db/models/competitor.model')
class Supscription {
    static addSubscription = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await req.user.populate('joinedCompetitions')
            if ((req.user.joinedCompetitions.findIndex(join => join.competition.toString() == req.params.compId)) >= 0) {
                const e = new Error('you already joined to this competition')
                e.name = 'Error'
                throw e
            }
            const competition = await Helper.isThisIdExistInThisModel(req.params.compId, null, competitionModel, 'competition')
            if(competition.stopSubscription){
                const e = new Error('this competition is not available to join now contact with us to ask for any thing you need')
                e.name = 'Error'
                throw e 
            }
            if (competition.type == 'final') {
                await req.user.populate('academyDetails')
                const qualifierOfTheSameYear = await competitionModel.findOne({ country: req.user.academyDetails.country, type: 'qualifier', year: competition.year }).populate('joins')
                const hisQualifierSubscription = qualifierOfTheSameYear.joins.find(join => join.academy.toString() == req.user._id.toString())
                const finalSubscription = await subscriptionModel.create({ competition: req.params.compId, academy: req.user._id })
                const competitors = await competitorModel.find({ qualifierSubscription: hisQualifierSubscription })
                await Promise.all(competitors.map(async (competitor) => {
                    competitor.finalSubscription = finalSubscription
                    const result = await competitor.save()
                }))
                const entries = await entryModel.find({ qualifierSubscription: hisQualifierSubscription })
                await Promise.all(entries.map(async (entry) => {
                    entry.finalSubscription = finalSubscription
                    await entry.save()
                }))
                if (true) { return finalSubscriptionpopulate({path:'competition',select:['type',"stopSubscription","showSchedule", "showResults"]}) }
            } else {
                delete req.body.subscriptionDate
                const subscription=await  subscriptionModel.create({ competition: req.params.compId, academy: req.user._id })
                if (true) { return subscription.populate({path:'competition',select:['type',"stopSubscription","showSchedule", "showResults"]}) }
            }
        }, 'congrats you have joined the competition successfully')
    }
    static getAllMySubscriptions = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return subscriptionModel.find({ academy: req.user._id }, ['_id', "competition",]).populate("competition")
        }, 'there is all your subscription')
    }
    static getAllSubscriptionsForCompetition = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return subscriptionModel.find({ competition: req.params.compId }).populate({ path: 'academy',select:['firstName','lastName','email'], populate:{path :'academyDetails',populate:{path:'country',select:['countryName']}} })
        }, 'there are all the academies that joined this competition')
    }
    static getMySubscriptionPaymentDetails=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
        //    await req.user.isThisSubscriptionBelongToMe(req.params.subscriptionId)
           await req.user.populate({path:'academyDetails',select:['country'],populate:{path:'country',select:['adminstrationFees','membershipFees']}})
           const type= (await Helper.isThisIdExistInThisModel(req.params.subscriptionId,['competition'],subscriptionModel,'subscription','competition')).competition.type
           const filter={}
           filter[type+'Subscription']=req.params.subscriptionId
           if(type=='final'){
            filter.passedQualifiers=true
           }
           const numOfCompetitior=await competitorModel.count(filter)
           const entries=await entryModel.find(filter)
           const totalEntriesFees=entries.reduce((all,now)=>all+now.totalFees,0)
           if(true){return {adminstrationFeesDetails:{yourCountryAdminstrationFees:req.user.academyDetails.country.adminstrationFees,theNumberOfYourJoinedCompetitors:numOfCompetitior,total:req.user.academyDetails.country.adminstrationFees*numOfCompetitior},
                            memberShipFeesDetails:{yourCountryMemberShipFees:req.user.academyDetails.country.membershipFees,theNumberOfYourJoinedCompetitors:numOfCompetitior,total:req.user.academyDetails.country.membershipFees*numOfCompetitior},
                            totalEntriesFees ,
                            totalFees:totalEntriesFees+numOfCompetitior*(req.user.academyDetails.country.membershipFees+req.user.academyDetails.country.adminstrationFees)
                        }}
        },'here all your payment')
    }
}
module.exports = Supscription