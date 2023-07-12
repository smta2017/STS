const subscriptionModel = require('../../db/models/subscription.model')
const competitionModel = require('../../db/models/competition.model')
const paymentModel = require('../../db/models/payment.model')
const Helper = require('../helper')
const entryModel = require('../../db/models/entry.model')
const countryModel = require('../../db/models/country.model')
const competitorModel = require('../../db/models/competitor.model')
const tokenModel = require('../../db/models/tokens.model')
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
            if (competition.stopSubscription) {
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
                if (true) { return finalSubscriptionpopulate({ path: 'competition', select: ['type', "stopSubscription", "showSchedule", "showResults"] }) }
            } else {
                delete req.body.subscriptionDate
                const subscription = await subscriptionModel.create({ competition: req.params.compId, academy: req.user._id })
                if (true) { return subscription.populate({ path: 'competition', select: ['type', "stopSubscription", "showSchedule", "showResults"] }) }
            }
        }, 'congrats you have joined the competition successfully')
    }
    static getAllMySubscriptions = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return subscriptionModel.find({ academy: req.user._id }, ['_id', "competition",'paid']).populate("competition")
        }, 'there is all your subscription')
    }
    static getAllSubscriptionsForCompetition = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return subscriptionModel.find({ competition: req.params.compId }).populate({ path: 'academy', select: ['firstName', 'lastName', 'email'], populate: { path: 'academyDetails', populate: { path: 'country', select: ['countryName'] } } })
        }, 'there are all the academies that joined this competition')
    }
    static getMySubscriptionPaymentDetails = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await req.user.isThisSubscriptionBelongToMe(req.params.subscriptionId)
            await req.user.populate({ path: 'academyDetails', select: ['country'], populate: { path: 'country', select: ['adminstrationFees', 'membershipFees'] } })
            const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId, ['competition','academy','paid'], subscriptionModel, 'subscription', { path: 'competition', populate: 'country' },{path:'academy',select:['email','mobileNumber','academyDetails'],populate:{path:'academyDetails',select:['schoolName']}})
            const type = subscription.competition.type
            const filter = {}
            filter[type + 'Subscription'] = req.params.subscriptionId
            const finalFees=await Helper.isThisIdExistInThisModel(process.env.FinalCompetitionPaymentDataID, null, countryModel, 'country')
            let currency
            let competitionAdminstrationFees
            let competitionMemberShipFees
            if (type == 'final') {
                filter.passedQualifiers = true
                currency=finalFees.currency
                competitionAdminstrationFees=finalFees.adminstrationFees
                competitionMemberShipFees=finalFees.membershipFees
            } else {
                currency=subscription.competition.country.currency
                competitionAdminstrationFees=subscription.competition.country.adminstrationFees
                competitionMemberShipFees=subscription.competition.country.membershipFees
            }
            const totalCredit={}
            const payments=await paymentModel.find({subscription:req.params.subscriptionId})
            payments.forEach(payment=>{
               if(payment.currency&&payment.amount&&(payment.bankReceiptPaymentData&&payment.bankReceiptPaymentData.accepted||payment.onlinePaymentData)){ if(totalCredit[payment.currency]){
                    totalCredit[payment.currency]+=payment.amount
                }else{
                    totalCredit[payment.currency]=payment.amount
                }}
            })
            const numOfCompetitior = await competitorModel.count(filter)
            const entries = await entryModel.find(filter)
            const totalEntriesFees = entries.reduce((all, now) => all + now[type+'TotalFees'], 0)
            const totalFees=totalEntriesFees + numOfCompetitior * (competitionAdminstrationFees + competitionMemberShipFees )
            const result={
                adminstrationFeesDetails: {  competitionAdminstrationFees, theNumberOfYourJoinedCompetitors: numOfCompetitior, total: (competitionAdminstrationFees * numOfCompetitior)+' '+currency },
                memberShipFeesDetails: { competitionMemberShipFees, theNumberOfYourJoinedCompetitors: numOfCompetitior, total: (competitionMemberShipFees * numOfCompetitior)+' '+currency },
                totalEntriesFees: totalEntriesFees +' '+ currency,
                totalFees: totalFees+' '+currency ,
                totalCredit,
                remaining:(totalFees-(totalCredit[currency]?totalCredit[currency]:0))+' '+currency,
                paid:subscription.paid
            }
            if(req.user.role.toString()==process.env.academy){
                result.needToHaveALook=payments.find(payment=>!payment.userSeen)?true:false
            }else{
                result.academyName=subscription.academy.academyDetails.schoolName
                result.academyOwnerNumber=subscription.academy.mobileNumber
                result.academyOwnerMail=subscription.academy.email
                result.needToHaveALook=payments.find(payment=>!payment.adminSeen)?true:false
            }
            if (true) {
                return result
            }
        }, 'here all your payment')
    }
    static changePaymentStatus=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
           const subscription= await subscriptionModel.findByIdAndUpdate(req.params.subscriptionId,{paid:req.body.paid})
           await tokenModel.deleteMany({owner:subscription.academy})
        },'this school has been approved as paid')
    }
}
module.exports = Supscription