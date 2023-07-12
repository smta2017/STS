const { findOne } = require('country-codes-list')
const academyModel = require('../../db/models/academy.model')
const tokenModel = require('../../db/models/tokens.model')
const userModel = require('../../db/models/user.model')
const createToken = require('../../db/models/tokens.model').createToken
const Helper = require('../helper')
const path=require('path')
const { sendmail } = require('../mail')
const countryCodeslist = require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
class User {
   static academyRegistration = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         if (!req.body.termsAndConditionsAccepted) {
            const e = new Error('the academy have to accept our terms and conditions to have an account')
            e.name = 'CastError'
            throw e
         }
         if (!req.body.owner.countryCallingCode) {
            const e = new Error('we need you country calling code with your phone number to complete this registeration')
            e.name = 'ValidationError'
            throw e
         }
         const academy = await academyModel.create(req.body)
         req.body.owner.role = process.env.academy/*academy role id */
         req.body.owner.academyDetails = academy._id
         req.body.owner.mobileNumber = countryCodeslist[req.body.owner.countryCallingCode.substring(1)] + ":" + req.body.owner.countryCallingCode + req.body.owner.mobileNumber
         const user = await userModel.create(req.body.owner)
         const token = await createToken({ id: user._id })
         sendmail(user.email, 'Confirmation Mail', `<h1>Email Confirmation</h1>
         <h2>Hello ${user.firstName}</h2>
         <p>welcome with you inour website, Please confirm your email by clicking on the following link</p>
         <a href=${process.env.domainName}/sts/user/confirm/${token}> Click here</a>
         </div>`)
      }, 'now you need to check your mail for a confimation mail to complete your registeration,you have maximum one hour to make this process otherwise this mail will be invalid and you will need to sign up again  ')
   }
   static employeeRegistration = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         req.body.mobileNumber = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
         req.body.password = 'Asd?1234'
         const user = await userModel.create(req.body)
         const token = await createToken({ id: user._id })
         sendmail(user.email, 'Confirmation Mail', `<h1>Email Confirmation</h1>
         <h2>Hello ${user.firstName}</h2>
         <p>welcome with you inour website, Please confirm your email by clicking on the following link</p>
         <a href=${process.env.domainName}/sts/user/confirm/${token}> Click here</a>
         </div>`)
      }, 'this Email is now registered as an employee , tell your employee to complete the registeration by checking his confirmation mail in one hour otherwise this account will be deleted')
   }
   static confirmMail = async (req, res) => {
      try {
         const token = req.params.confimation
         const tokenExist = await tokenModel.findOne({ token })
         if (!tokenExist) {
            res.render('404ErrorPage', { error: 'this confimation mail is no longer valid' })
         } else {
            const user = await Helper.isThisIdExistInThisModel(tokenExist.owner, null, userModel, 'user') //.populate('userData')
            if (!user) {
               res.render('404ErrorPage', { error: 'your user has been removed because you had token long time to confirm ,you can user the same mail to sgin up again  ' })
            } else {
               user.date = ""
               user.suspended = false
               await user.save()
               res.redirect('/')
            }
         }
      } catch (e) {
         res.render('404ErrorPage', { error: 'there is something go wrong, please contact us if you need any help' })
      }
   }
   static sendMailToUpdatePass = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         console.log(req.body.email)
         const user = await userModel.findOne({ email: req.body.email })
         console.log(user)
         if (!user) {
            const e = new Error('this email is not registered you can sign up now')
            e.name = 'CastError'
            throw e
         }
         const token =await tokenModel.createToken({ id: user._id })
         sendmail(user.email, 'this mail to change your password', `<h1>for changing your password<h1>
         <h2>Hello ${user.firstName}</h2>
         <p>make sure to never forget your password again</p>
         <a href=${process.env.domainName}/sts/user/changepassword/${token}> Click here</a>
         </div>`)
      }, 'please check your mail')
   }
   static getChangePassForm = async (req, res) => {
      // try{
      //    if(req.body.password!=req.body.confirmPassword){
      //       Helper.formatMyAPIRes(res,400,false,undefined,'please make sure that your password and password confirmation is identeical')
      //    }else{
      //       req.user.password==req.body.password
      //       await req.user.save()
      //       await tokenModel.deleteMany()
      //       res.redirect('/')
      //    }
      // }catch(e){
      //    res.render('404ErrorPage',{error:'there is something go wrong, please contact us if you need any help'})
      // }
      try {
         const token = req.params.token
         const tokenExist = await tokenModel.findOne({ token })
         if (!tokenExist) {
            res.render('404ErrorPage', { error: 'this mail is no longer valid' })
         } else {
            const user = await Helper.isThisIdExistInThisModel(tokenExist.owner, null, userModel, 'user') //.populate('userData')
            if (!user) {
               res.render('404ErrorPage', { error: 'there is a proplem with your account please contact us ' })
            } else {
               await tokenModel.findByIdAndDelete(tokenExist._id)
               const newToken = await tokenModel.createToken({ id: user._id })
               res.render('forgetpassword', {token:newToken })
            }
         }
      } catch (e) {
         console.log(e)
         res.render('404ErrorPage', { error: 'there is something go wrong, please contact us if you need any help' })
      }

   }
   static recieveChangePassword = async (req, res) => {
      try {
         const token = req.header('Authorization')
         const tokenExist = await tokenModel.findOne({ token })
         if (!tokenExist) {
            res.render('404ErrorPage', { error: 'this form is no longer valid' })
         } else {
            const user = await Helper.isThisIdExistInThisModel(tokenExist.owner, null, userModel, 'user') //.populate('userData')
            if (!user) {
               res.render('404ErrorPage', { error: 'there is a proplem with your account please contact us ' })
            } else {
               // if (req.body.password != req.body.confirmPassword) {
               //    Helper.formatMyAPIRes(res, 400, false, undefined, 'please make sure that your password and password confirmation is identeical')
               // } else {
                  user.password == req.body.password
                  await user.save()
                  if (req.body.logOut) {
                     await tokenModel.deleteMany({ owner: req.user._id })
                  } else {
                     await tokenModel.findOneAndDelete({ token })
                  }
                  res.sendFile(path.join(__dirname,'../../statics/STS-Frontend-Website/index.html'))
               // }
            }
         }
      } catch (e) {
         console.log(e)
         res.render('404ErrorPage', { error: 'there is something go wrong, please contact us if you need any help' })
      }
   }
   static logIn = (req, res) => {
      Helper.handlingMyFunction(req, res, async (req) => {
         const user = await userModel.logIn(req.body)
         await user.populate('academyDetails')
         const isRuler = [process.env.refree1, process.env.refree2, process.env.refree3].includes(user.role.toString())/*refree roles ids */
         const isAdmin = (user.role.toString() != process.env.academy/*academy role id */) && !isRuler
         let isOtherCountry = false
         if (!isAdmin && !isRuler) {
            isOtherCountry = (user.academyDetails.country == process.env.otherCountry)
         }
         if (isAdmin) {
            await user.populate({ path: 'role', select: ['tabs'], populate: 'tabs' })
         }

         const token = await createToken({ id: user._id }, req.body.lifeTime)
         if (true) {
            return { user, token, isRuler, isAdmin, isOtherCountry/*,joinCompetions:user.joinedCompetions*/ }
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
         const result = {}
         await userModel.logIn({ email: req.user.email, password: req.body.oldPassword })
         if (req.body.user && Object.keys(req.body.user).length > 0) {
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
               if (!['suspended', 'role', 'academyDetails', '_id'].includes(field) && req.body.user[field]) {
                  console.log(req.body.user[field])
                  req.user[field] = req.body.user[field]
               }
            }
            req.user.date = undefined
            result.userData = await req.user.save()
         }
         if (req.user.role == process.env.academy/*academy role id */ && req.body.academy && Object.keys(req.body.academy).length > 0) {
            const academy = await Helper.isThisIdExistInThisModel(req.user.academyDetails, null, academyModel, 'academy')
            for (let field in req.body.academy) {
               if (!['country', '_id', 'termsAndConditionsAccepted'].includes(field) && req.body.academy[field]) {
                  if (field = 'schoolLocation') { for (let key in req.body.academy[field]) { academy[field][key] = req.body.academy[field][key] } } else { academy[field] = req.body.academy[field] }
               }
            }
            result.newAcademyData = await academy.save()
         }
         if (true) {
            return result
         }
      }, 'you update your data successfully')
   }
}
module.exports = User