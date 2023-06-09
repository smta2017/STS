const competitorModel=require('../../db/models/competitor.model')
const countryCodeslist = require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
const Helper = require('../helper')
class Competitor{
    static addCompetitor = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            req.body.mobileNumber = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
            return competitorModel.create(req.body)
        }, 'your competitor was added successfully')
    }
    static removeCompetitor = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
           await  Helper.isThisIdExistInThisModel(req.params.competitorId,null, competitorModel, 'competitor')
            if(true){
               return competitorModel.findByIdAndDelete(req.params.competitorId)
            }
        }, 'competitor was removed successfully')
    }
    static getThisSubscriptionCompetitors=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return competitorModel.find({subscription:req.params.subscriptionId})
        },'there are all your subscription')
    }
    static editCompetitor=(req,res)=>{
       Helper.handlingMyFunction(req,res,async (req)=>{
        const competitor=await Helper.isThisIdExistInThisModel(req.params.competitorId,null,competitorModel,'competitor')
         for (let field in req.body) {
            if(field=='mobileNumber'){
                if(req.body.countryCallingCode){
                    competitor[field]=countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
                }else{
                    const e = new Error('we need the competitor country calling code to change his mobile number')
                e.name = 'CastError'
                throw e
                }
            }
            if(!['gender','category','mobileNumber'].includes(field)){competitor[field] = req.body[field]}
        }
        if(true){return competitor.save()}
       },'competitor was edited successfully')
    }
}
module.exports=Competitor