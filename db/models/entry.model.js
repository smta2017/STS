const mongoose = require('mongoose')
const competitorModel = require('./competitor.model')
const Helper = require('../../app/helper')
const EntrySchema = mongoose.Schema({
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
    competitorsCategories: {
        type: [String],
        enum: ['dancer', 'singer', 'musician'],
        trim: true,
        lowercase: true
    },
    category: {
        type: String,
        enum: ["solo", 'duo', 'trio', 'small group', 'large group'],

    },
    competitors: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'competitors',
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'please enter the entry name'],
        trim: true,
        minlength: 3,
    },
    music: {
        type: String,
        trim: true
    },
    totalFees:{
        type:Number,
        min:0
    },
    qualifierRefree1: {
        type: Number,
        max: 30,
        min: 0
    },
    qualifierRefree2: {
        type: Number,
        max: 30,
        min: 0
    },
    qualifierRefree3: {
        type: Number,
        max: 30,
        min: 0
    },
    qualifierLast10Present: {
        type: Number,
        max: 10,
        min: 0
    },
    qualifierTotalDegree: {
        type: Number,
        max: 100,
        min: 0
    },
    qualifierShowDate: {
        type: Date,
    },
    passedQualifiers: {
        type: Boolean,
        default: false
    },
    finalRefree1: {
        type: Number,
        max: 30,
        min: 0
    },
    finalRefree2: {
        type: Number,
        max: 30,
        min: 0
    },
    finalRefree3: {
        type: Number,
        max: 30,
        min: 0
    },
    finalLast10Present: {
        type: Number,
        max: 10,
        min: 0
    },
    finalTotalDegree: {
        type: Number,
        max: 100,
        min: 0
    },
    finalShowDate: {
        type: Date,
    },
})
EntrySchema.pre('save', async function () {
    if (this.isDirectModified('qualifierRefree1') || this.isDirectModified('qualifierRefree2') || this.isDirectModified('qualifierRefree3') || this.isDirectModified('qualifierLast10Present')) {
        console.log('qualifier Total Degree changes')
        this.qualifierTotalDegree = this.qualifierRefree1 + this.qualifierRefree2 + this.qualifierRefree3 + this.qualifierLast10Present
        if (this.qualifierTotalDegree > 70) {
            await Promise.all(
                this.competitors.map(async(competitor) => {
                  const comp= await competitorModel.findByIdAndUpdate(competitor,{$set: { passQualifier: true }},{returnDocument:"after"})
                    console.log(comp)
                })
            )
           const sub= await subscriptionModel.findByIdAndUpdate(this.qualifierSubscription,{$set: { haveASuccessededEntry: true }},{returnDocument:"after"})
                console.log(sub)
        }
    }
    if (this.isDirectModified('finalRefree1') || this.isDirectModified('finalRefree2') || this.isDirectModified('finalRefree3') || this.isDirectModified('finalLast10Present')) {
        console.log('final Total Degree changes')
        this.finalTotalDegree = this.finalRefree1 + this.finalRefree2 + this.finalRefree3 + this.finalLast10Present
    }
    if (this.isDirectModified('competitors')) {
        const category = { 1: 'solo', 2: 'duo', 3: 'trio' }
        let calCategory
        if (this.competitors.length > 0) {
            if (category[this.competitors.length]) {
                this.category = category[this.competitors.length]
                if(category[this.competitors.length]!='solo'){
                    calCategory='duoOrTrio'
                }else{
                    calCategory=category[this.competitors.length]
                }
            } else if (this.competitors.length < 7) {
                this.category = 'small group'
                calCategory='group'
            } else {
                this.category = 'large group'
                calCategory='group'
            }
        }
        console.log('competitors category changes')
        const enteredCompetitors=[]
        const subscription =await Helper.isThisIdExistInThisModel(this.qualifierSubscription,['academy'],subscriptionModel,'subscription',{path:'academy',populate:{path:'academyDetails',populate:{path:'country'}}})
        console.log(subscription.academy.academyDetails.country)
        let totalFees=0
        this.competitorsCategories=[]
        await Promise.all(
            this.competitors.map(async (competitor) => {
                const compor = await Helper.isThisIdExistInThisModel(competitor, ['qualifierSubscription','category'], competitorModel, 'competitor')
                if (compor.qualifierSubscription.toString() != this.qualifierSubscription.toString()) {
                    const e = new Error('this competitor is not our to add him in our entry')
                    e.name = 'CastError'
                    throw e
                }
                
                if (!this.competitorsCategories.includes(compor.category)) {
                    this.competitorsCategories.push(compor.category)
                }
                if(enteredCompetitors.includes(competitor.toString())){
                    const e = new Error('there is a duplication in the competitor list')
                    e.name = 'CastError'
                    throw e
                }else{
                    enteredCompetitors.push(competitor.toString())
                }
                totalFees+=subscription.academy.academyDetails.country.toObject()[calCategory+compor.category+'Fees']
            })
        )
        // if (this.competitorsCategories.includes('singer') && this.competitorsCategories.length > 1) {
        //     const e = new Error('not allowed to add singer with competitors from other sections in the same entry')
        //     e.name = 'ValidationError'
        //     throw e
        // }
        this.totalFees=totalFees
    }
})
const entryModel = mongoose.model('entries', EntrySchema)
module.exports = entryModel
var subscriptionModel = require('./subscription.model')