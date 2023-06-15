const academyModel = require('../../db/models/academy.model')
const tokenModel = require('../../db/models/tokens.model')
const userModel = require('../../db/models/user.model')
const createToken = require('../../db/models/tokens.model').createToken
const Helper = require('../helper')
const countryCodeslist = require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
class User {
   static academyRegistration = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         const academy = await academyModel.create(req.body)
         req.body.owner.role = '6480d5701c02f26cd6668987'/*academy role id */
         req.body.owner.academyDetails = academy._id
         req.body.owner.mobileNumber = countryCodeslist[req.body.owner.countryCallingCode.substring(1)] + ":" + req.body.owner.countryCallingCode + req.body.owner.mobileNumber
         if (true) { return userModel.create(req.body.owner) }
      }, 'you registered successfully')
   }
   static employeeRegistration = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         req.body.mobileNumber = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
         req.body.password = 'Asd?1234'
         return userModel.create(req.body)
      }, 'this Email is now registered as an employee')
   }
   static logIn = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         const user = await userModel.logIn(req.body)
         await user.populate('academyDetails')
         const isRuler = ['6486bca99dd036cbf366140a', '6486bcef9dd036cbf366140e', '6486bd269dd036cbf3661410'].includes(user.role.toString())/*refree roles ids */
         const isAdmin = (user.role.toString() != '6480d5701c02f26cd6668987'/*academy role id */) && !isRuler
         const token = await createToken({ id: user._id }, req.body.lifeTime)
         if (true) {
            return { user, token, isRuler, isAdmin/*,joinCompetions:user.joinedCompetions*/ }
         }
      }, "you logged in successfully")
   }
   static logOut = (req, res) => {
      Helper.handlingMyFunction(req, res, (req) => {
         return tokenModel.findOneAndDelete({ token: req.header('Authorization') })
      }, 'you logged out successfully')
   }
   static logOutFromAllDevices = (req, res) => {
      Helper.handlingMyFunction(req, res, (req) => {
         return tokenModel.deleteMany({ owner: req.user._id })
      }, 'you logged out successfully')
   }
   static updateMyProfile = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         const result={}
         await userModel.logIn({ email: req.user.email, password: req.body.oldPassword })
        if(req.body.user&&Object.keys(req.body.user).length>0) {
            if (req.body.user.mobileNumber) {
               if (req.body.user.countryCallingCode) {
                  req.body.user.mobileNumber = countryCodeslist[req.body.user.countryCallingCode.substring(1)] + ":" + req.body.user.countryCallingCode + req.body.user.mobileNumber
               } else {
                  const e = new Error('to change your mobile number you have to enter the new number country calling code')
                  e.name = 'CastError'
                  throw e
               }
            }
            for (let field in req.body.user) {
               if (!['suspended', 'role', 'academyDetails', '_id'].includes(field)) { req.user[field] = req.body.user[field] }
            }
            result.userData=await req.user.save()
         }
         if(req.user.role=='6480d5701c02f26cd6668987'/*academy role id */&&req.body.academy&&Object.keys(req.body.academy).length>0) {
            const academy=await Helper.isThisIdExistInThisModel(req.user.academyDetails,null,academyModel,'academy')
            for (let field in req.body.academy) {
               if (!['country', '_id'].includes(field)) { academy[field] = req.body.academy[field] }
            }
            result.newAcademyData=await academy.save()
         }
         if (true) {
            return result
         }
      })
   }
}
module.exports = User