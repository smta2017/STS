const mongoose = require('mongoose')
const moment = require('moment')
const validator = require('validator')
const CompetitorSchema = mongoose.Schema({
    qualifierSubscription: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'subscriptions',
        required: [true, 'this competitor belong to which academy to competition subscription'],
        trim: true,
        immutable: true,
    },
    finalSubscription: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'subscriptions',
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, 'please enter the competitor name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    lastName: {
        type: String,
        required: [true, 'please enter the competitor last name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    category: {
        type: String,
        enum: ['dancer', 'musician', 'singer'],
        required: [true, 'what is the category of this competitor'],
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'we need to know the competitor date of birth'],
        validate: async function () {
            const year = (await Helper.isThisIdExistInThisModel(this.qualifierSubscription, ['competition'], subscriptionModel, 'subscription', 'competition')).competition.year
            const age = moment(year + '-06-01').diff(moment(this.dateOfBirth), 'years', true)
            if (age < 4) {
                const e = new Error('this comprtitor is too young to take apart in this competition')
                e.name = 'ValidationError'
                throw e
            } else if ((this.category == 'dancer' && age > 28) || age > 45) {
                const e = new Error('this competition is for younger persons')
                e.name = 'ValidationError'
                throw e
            }
        }
    },
    rank: {
        type: String,
        // enum:[],
        set: function (year) {

            const age = moment(year + '-06-01').diff(moment(this.dateOfBirth), 'years', true)
            if (age > 4 && age < 10) {
                return 'mini'
            } else if (age >= 10 && age < 14) {
                return 'k'
            } else if (age >= 14 && age < 18) {
                return 'j'
            } else if ((age >= 18 && age < 28) || (age >= 28 && age < 45 && this.category != 'dancer')) {
                return 'sn'
            } else {
                return 'unknown'
            }
        }
    },
    mobileNumber: {
        type: String,
        required: [true, "please enter your phone number"],
        trim: true,
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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    gender: {
        type: String,
        required: [true, "enter the competitor's  gender"],
        enum: ['male', 'female'],
        trim: true,
        lowercase: true
    },
    passedQualifiers: {
        type: Boolean,
        default: false
    }
})
CompetitorSchema.pre('save', async function () {
    const year = (await Helper.isThisIdExistInThisModel(this.qualifierSubscription, ['competition'], subscriptionModel, 'subscription', 'competition')).competition.year
    if (this.isDirectModified('dateOfBirth')) this.rank = year
})
const competitorModel = mongoose.model('competitors', CompetitorSchema)
module.exports = competitorModel
var subscriptionModel = require('./subscription.model')
const Helper = require('../../app/helper')
