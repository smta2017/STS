const academyModel = require('../../db/models/academy.model')
const userModel=require('../../db/models/user.model')
const createToken=require('../../db/models/tokens.model').createToken
const Helper = require('../helper')
const countryCodeslist=require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
class User{
 static academyRegistration=(req,res)=>{
    Helper.handlingMyFunction(req,res,async(req)=>{
        const academy=await academyModel.create(req.body)
        req.body.owner.academyDetails=academy._id
        req.body.owner.mobileNumber=countryCodeslist[req.body.owner.countryCallingCode.substring(1)] + ":" + req.body.owner.countryCallingCode +req.body.owner.mobileNumber
        if(true){return userModel.create(req.body.owner)}
    },'you registered successfully')
 }
 static employeeRegistration=(req,res)=>{
    Helper.handlingMyFunction(req,res,async(req)=>{
        req.body.mobileNumber=countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode +req.body.mobileNumber
        return userModel.create(req.body)
    },'this Email is now registered as an employee')
 }
 static login=(req,res)=>{
    Helper.handlingMyFunction(req,res,async(req)=>{
       const user=await userModel.logIn(req.body)
        // if(user.role==""/*we need to put academy role object id here*/ ){
           await user.populate('academyDetails')//.populate('joinedCompetions')
        // }else{}
        const token =await createToken({id:user._id})
        if(true){
            return {user,token/*,joinCompetions:user.joinedCompetions*/}
        }
    },"you logged in successfully")
 }
}
module.exports=User