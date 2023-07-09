const mongoose = require('mongoose')

const SubscriptionSchema = mongoose.Schema({
    competition: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'what is the competition that youwant to join'],
        ref: 'competitions',
        trim: true,
        immutable: true,
    },
    academy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'what is the competition that youwant to join'],
        ref: 'users',
        trim: true,
        immutable: true
    },
    subscriptionDate: {
        type: Date,
        default: Date.now()
    },
    haveASuccessededEntry: {
        type: Boolean,
        default: false
    },
    paid:{
        type:Boolean,
        default:false
    }
})
SubscriptionSchema.methods.deleteMe = async function (type) {
    await subscriptionModel.findByIdAndDelete(this._id)
    if (type == 'qualifier') {
        const subscriptionEntries = await entryModel.find({ qualifierSubscription: this._id })
        await Promise.all(
            subscriptionEntries.map(entry => {
                entryModel.findByIdAndDelete(entry._id)
                if (fs.existsSync(path.join(__dirname, '../../statics/' + entry.music))) {
                    fs.unlinkSync(path.join(__dirname, '../../statics/' + entry.music))
                }
            })
        )

        await competitorModel.deleteMany({ qualifierSubscription: this._id })
    } else {
        const needToBeFreedEntries = await entryModel.find({ finalSubscription: this._id })
        await Promise.all(
            needToBeFreedEntries.map(entry => {
                entry.finalSubscription = undefined
                entry.save()
            })
        )
        const needToBeFreedCompetitors = await competitorModel.find({ finalSubscription: this._id })
        await Promise.all(
            needToBeFreedCompetitors.map(competitor => {
                competitor.finalSubscription = undefined
                competitor.save()
            })
        )
    }

}
const subscriptionModel = mongoose.model('subscriptions', SubscriptionSchema)
module.exports = subscriptionModel
var entryModel = require('./entry.model')
var competitorModel = require('./competitor.model')