const mongoose = require('mongoose')
const competitorModel = require('./competitor.model')
const countryModel = require('./country.model')
const Helper = require('../../app/helper')
const stylesAbstraction = {
    'Solo Classical': 'SC',
    'Duo Classical': 'DC',
    'Concerto Classical': 'Cc',
    'Chamber_ensemble Classical': 'CEc',
    'Orchestra Classical': 'OC',
    'Solo Jazz': 'Sj',
    'Duo Jazz': 'Dj',
    'Concerto Jazz': 'Cj',
    Chamber_music_Jazz: 'Cjj',
    'Solo Pop': 'SP',
    'Duo Pop': 'DP',
    'Concerto Pop': 'Cp',
    Chamber_music_Pop: 'CPP',
    'Solo Traditional Music': 'CPP',
    'Duo Traditional Music': 'CPP',
    'Concerto Traditional Music': 'CPP',
    'Chamber Traditional Music': 'CPP',
    'Solo Rock': 'SR',
    'Duo Rock': 'DR',
    'Mini_group Rock': 'MGR',
    'Large_group Rock': 'LGR',
    'Mini_group Pop': 'MGP',
    'Large_group Pop': 'LGP',
    'choir Classical': 'CC',
    'Solo Opera': 'SO',
    'Duo Opera': 'DO',
    'choir Opera': 'CO',
    'Orchestra Opera': 'OO',
    'Solo Blues OR Jazz': 'SBJ',
    'Duo Blues OR Jazz': 'DBJ',
    'Mini_group Blues OR Jazz': 'MGBJ',
    'Large_group Blues OR Jazz': 'LGBJ',
    'Solo Soul': 'Ss',
    'Duo Soul': 'Ds',
    'Mini_group Soul': 'MGs',
    'Large_group Soul': 'LGs',
    'Solo Rap': 'Sr',
    'Duo Rap': 'Dr',
    'Mini_group Rap': 'MGr',
    'Large_group Rap': 'LGr',
    'Mini_group A Cappella': 'MGAC',
    'Large_group A Cappella': 'LGAC',
    'Classical Neoclassical Repertoire Any other ballet style': 'B',
    'Classical Neoclassical Any other ballet style': 'B',
    'Classical Neoclassical Any other ballet style(pointe shoes)': 'PB',
    Reportoire: 'BR',
    'Reportoire(pointe shoes allowed)': 'Fuck',
    'National & flokore': 'N',
    Lyrical: 'L',
    Contemporary: 'E',
    'Show Dance': 'W',
    Jazz: 'Z',
    'Street Dance': 'H',
    Commercial: 'C',
    Arco: 'A',
    Tap: 'T',
    'Lyrical and Contemporary': 'L',
    'Jazz and Show Dance': 'W',
    'Street Dance & Commercial': 'H',
    'Song and Dance': 'V',
    'Mini_group Classical': 'MGC',
    'Large_group Classical': 'LGC',
    'Musical Dance Show': 'DM',
    'shared entry': 'SH'
}
const EntrySchema = mongoose.Schema({
    style: {
        type: String,
        enum: [
            'Solo Classical',
            'Duo Classical',
            'Concerto Classical',
            'Chamber_ensemble Classical',
            'Orchestra Classical',
            'Solo Jazz',
            'Duo Jazz',
            'Concerto Jazz',
            'Chamber_music_Jazz',
            'Solo Pop',
            'Duo Pop',
            'Concerto Pop',
            'Chamber_music_Pop',
            'Solo Traditional Music',
            'Duo Traditional Music',
            'Concerto Traditional Music',
            'Chamber Traditional Music',
            'Solo Rock',
            'Duo Rock',
            'Mini_group Rock',
            'Large_group Rock',
            'Solo Pop',
            'Duo Pop',
            'Mini_group Pop',
            'Large_group Pop',
            'Solo Classical',
            'Duo Classical',
            'choir Classical',
            'Orchestra Classical',
            'Solo Opera',
            'Duo Opera',
            'choir Opera',
            'Orchestra Opera',
            'Solo Blues OR Jazz',
            'Duo Blues OR Jazz',
            'Mini_group Blues OR Jazz',
            'Large_group Blues OR Jazz',
            'Solo Soul',
            'Duo Soul',
            'Mini_group Soul',
            'Large_group Soul',
            'Solo Rap',
            'Duo Rap',
            'Mini_group Rap',
            'Large_group Rap',
            'Mini_group A Cappella',
            'Large_group A Cappella',
            'Classical Neoclassical Repertoire Any other ballet style',
            'Classical Neoclassical Any other ballet style',
            'Classical Neoclassical Any other ballet style(pointe shoes)',
            'Reportoire',
            'Reportoire(pointe shoes allowed)',
            'National & flokore',
            'Lyrical',
            'Contemporary',
            'Show Dance',
            'Jazz',
            'Street Dance',
            'Commercial',
            'Arco',
            'Tap',
            'Lyrical and Contemporary',
            'Jazz and Show Dance',
            'Street Dance & Commercial',
            'Song and Dance',
            'Duo Rock',
            'Mini_group Rock',
            'Large_group Rock',
            'Duo Pop',
            'Mini_group Pop',
            'Large_group Pop',
            'Duo Classical',
            'Mini_group Classical',
            'Large_group Classical',
            'choir Classical',
            'Orchestra Classical',
            'Duo Blues OR Jazz',
            'Mini_group Blues OR Jazz',
            'Large_group Blues OR Jazz',
            'Duo Soul',
            'Mini_group Soul',
            'Large_group Soul',
            'Duo Rap',
            'Mini_group Rap',
            'Large_group Rap',
            'Musical Dance Show',
            'shared entry'
        ],
        required: [true, 'we need the style of the entry to make it']
    },
    classCode: String,
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
        // enum: ["solo", 'duo', 'trio', 'small group', 'large group'],

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
    qualifierTotalFees: {
        type: Number,
        min: 0
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
    finalTotalFees: {
        type: Number,
        min: 0
    },
})
EntrySchema.pre('save', async function () {
    if (this.isDirectModified('qualifierRefree1') || this.isDirectModified('qualifierRefree2') || this.isDirectModified('qualifierRefree3') || this.isDirectModified('qualifierLast10Present')) {
        this.qualifierTotalDegree = this.qualifierRefree1 + this.qualifierRefree2 + this.qualifierRefree3 + this.qualifierLast10Present
        if (this.qualifierTotalDegree > 70 && this.isDirectModified('qualifierLast10Present')) {
            await Promise.all(
                this.competitors.map(async (competitor) => {
                    const comp = await competitorModel.findByIdAndUpdate(competitor, { $set: { passedQualifiers: true } }, { returnDocument: "after" })
                })
            )
            const sub = await subscriptionModel.findByIdAndUpdate(this.qualifierSubscription, { $set: { haveASuccessededEntry: true } }, { returnDocument: "after" })
            this.passedQualifiers = true
        }
    }
    if (this.isDirectModified('finalRefree1') || this.isDirectModified('finalRefree2') || this.isDirectModified('finalRefree3') || this.isDirectModified('finalLast10Present')) {
        this.finalTotalDegree = this.finalRefree1 + this.finalRefree2 + this.finalRefree3 + this.finalLast10Present
    }
    if (this.isDirectModified('competitors') || this.isDirectModified('style')) {
        let calCategory
        if (this.competitors.length > 0) {
            if (this.competitors.length == 1) {
                this.classCode = 'S'
                this.category = 'solo'
                calCategory = 'solo'
            } else if (this.competitors.length < 3) {
                this.classCode = 'D'
                this.category = 'duoOrTrio'
                calCategory = 'duoOrTrio'
            }
            else if (this.competitors.length < 7) {
                this.classCode = 'GS'
                this.category = 'small group'
                calCategory = 'group'
            } else {
                this.classCode = 'GL'
                this.category = 'large group'
                calCategory = 'group'
            }
        }
        const enteredCompetitors = []
        const subscription = await Helper.isThisIdExistInThisModel(this.qualifierSubscription, ['academy'], subscriptionModel, 'subscription', { path: 'academy', populate: { path: 'academyDetails', populate: { path: 'country' } } })
        const finalFees = await Helper.isThisIdExistInThisModel(process.env.FinalCompetitionPaymentDataID, null, countryModel, 'country')
        let totalFees = 0
        let finalTotalFees = 0
        this.competitorsCategories = []
        let entryAgeCat
        await Promise.all(
            this.competitors.map(async (competitor) => {
                const compor = await Helper.isThisIdExistInThisModel(competitor, ['qualifierSubscription', 'category','rank'], competitorModel, 'competitor')
                if (compor.qualifierSubscription.toString() != this.qualifierSubscription._id.toString()) {
                    console.log(compor.qualifierSubscription.toString(),this.qualifierSubscription_id.toString())
                    const e = new Error('this competitor is not our to add him in our entry')
                    e.name = 'CastError'
                    throw e
                }

                if (!this.competitorsCategories.includes(compor.category)) {
                    this.competitorsCategories.push(compor.category)
                }
                if (enteredCompetitors.includes(competitor.toString())) {
                    const e = new Error('there is a duplication in the competitor list')
                    e.name = 'CastError'
                    throw e
                } else {
                    enteredCompetitors.push(competitor.toString())
                }
                if (compor.rank == 'Sn' || (compor.rank == 'J' && entryAgeCat !== 'Sn') || (compor.rank == 'K' && entryAgeCat !== 'Sn' && entryAgeCat !== 'J') || (compor.rank == 'mini' && entryAgeCat !== 'K' && entryAgeCat !== 'Sn' && entryAgeCat !== 'J'))
                  {  entryAgeCat = compor.rank}
                totalFees += subscription.academy.academyDetails.country.toObject()[calCategory + compor.category + 'Fees']
                finalTotalFees += finalFees.toObject()[calCategory + compor.category + 'Fees']
            })
        )
        this.classCode = entryAgeCat + this.classCode
        if(stylesAbstraction[this.style]=='Fuck'){
            if(this.classCode=='KS'){
                this.classCode+='PBR'
            }else if(this.classCode[this.classCode.length-1]=='D'&&this.classCode.substring(0,this.classCode.length-1)!='mini'){
                this.classCode+='PDD'
            }else if((this.classCode[this.classCode.length-1]=='GS'||this.classCode[this.classCode.length-1]=='GL')&&this.classCode.substring(0,this.classCode.length-1)!='mini'){
                this.classCode+='BC'
            }else{
                this.classCode+='BR'
            }
        }else{
            this.classCode+=stylesAbstraction[this.style]
        }
        this.category=entryAgeCat=='Sn'?'Senior':entryAgeCat=='J'?'Junior':entryAgeCat=='K'?'Children':entryAgeCat +this.category
        // if (this.competitorsCategories.includes('singer') && this.competitorsCategories.length > 1) {
        //     const e = new Error('not allowed to add singer with competitors from other sections in the same entry')
        //     e.name = 'ValidationError'
        //     throw e
        // }
        this.qualifierTotalFees = totalFees
        this.finalTotalFees = finalTotalFees
    }
})
const entryModel = mongoose.model('entries', EntrySchema)
module.exports = entryModel
var subscriptionModel = require('./subscription.model')