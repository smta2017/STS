const mongoose = require('mongoose')
const validator = require('validator')
// const jsonWebToken=require('jsonwebtoken')
const countryCodeslist = require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
const bcrypt = require('bcrypt')
const subscriptionModel = require('./subscription.model')
const { isThisIdExistInThisModel } = require('../../app/helper')
const Helper = require('../../app/helper')
const UserSchema = mongoose.Schema({
    role: {//foreginKey to know what you can see or do
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'roles',
        required: [true, 'please enter this employee position']
    },
    firstName: {
        type: String,
        required: [true, 'please enter academy owner first name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    lastName: {
        type: String,
        required: [true, 'please enter academy owner first name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    mobileNumber: {
        type: String,
        required: [true, "please enter your phone number"],
        trim: true,
        unique: true,
        validate(value) {
            let val = value.split(':')
            if (!validator.isMobilePhone(val[1], val[0])) {
                throw new Error('this mobile number invalid')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        // default:'12345'
        required: [true, 'the password is required field']
    },
    academyDetails: {//foregin key to know his academy if your role is academy
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'academies',
        required: [function type() {
            return this.role == process.env.academy//you need to put the objectId of academy role
        }, 'you are academy we need your academy details for registration']
    },
    suspended: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: new Date(),
        expires: 600
    }
})
UserSchema.pre('save', function () {
    if (this.isModified('password')) this.password = bcrypt.hashSync(this.password, 12)
})
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.__v
    delete userObject.password
    return userObject
}
UserSchema.methods.isThisSubscriptionBelongToMe = async function (subscriptionId) {
    if (this.role == process.env.academy/*academy role id */) {
        const subscription = await Helper.isThisIdExistInThisModel(subscriptionId, ['academy'], subscriptionModel, 'subscription')
        if (subscription.academy.toString() != this._id.toString()) {
            const e = new Error('this is not your subscription to make changes in or to ask any data about it')
            e.name = 'CastError'
            throw e
        }
    }
}
UserSchema.statics.logIn = async (loginData) => {
    let isUserExist
    if (loginData.countryCallingCode && loginData.mobileNumber) {
        isUserExist = await userModel.findOne({ mobileNumber: countryCodeslist[loginData.countryCallingCode.substring(1)] + ":" + loginData.countryCallingCode + loginData.mobileNumber })
    } else if (loginData.email && !isUserExist) {
        isUserExist = await userModel.findOne({ email: loginData.email })
    } else {
        const e = new Error('you did not send user email or phone number with the country code ')
        e.name = 'CastError'
        throw e
    }
    if (!isUserExist) {
        const e = new Error('there is no user with such email or mobile number (if you have registered before but did not make the confirmation from your mail then your account has been deleted please sign up again )')
        e.name = 'CastError'
        throw e
    }
    if (isUserExist.suspended) {
      if(isUserExist.date){
        const e = new Error('you need to confirm registeration from your mail,please check your mail to be able to log in')
        e.name = 'Error'
        throw e
      }else{ 
         const e = new Error('your account has been blocked from  the website organizers please contact us from our mail or contact us form ')
        e.name = 'Error'
        throw e}
    }
    if (loginData.password) {
        if (!bcrypt.compareSync(loginData.password, isUserExist.password)) {
            const e = new Error('invalid password')
            e.name = 'CastError'
            throw e
        }
    } else {
        const e = new Error('there is no password to log you in,please enter your password')
        e.name = 'CastError'
        throw e
    }
    return isUserExist
}
UserSchema.virtual('joinedCompetitions', {
    ref: 'subscriptions',
    localField: '_id',
    foreignField: 'academy'
})
const userModel = mongoose.model('users', UserSchema)
module.exports = userModel