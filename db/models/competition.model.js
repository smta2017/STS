const mongoose = require('mongoose')
const CompetitionSchema = mongoose.Schema({
    year: {
        type: Number,
        min: 2023,
        required: [true, 'please enter the year that the competition will take place']
    },
    type: {
        type: String,
        enum: ['final', 'qualifier'],
        lawercase: true,
        required: [true, 'please enter what is the type of this new competition'],
        trim: true
    },
    country: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [function checkType() {
            return this.type == 'qualifier'
        }, 'this competition is a qualifier please enter where will it take place'],
        ref: 'countries'
    },
    startSubscription: {
        type: Date,
        required: [true, 'please enter when will the competition start to have Subscriptions']
    },
    endSubscription: {
        type: Date,
        required: [true, 'please enter when will the competition stop to have Subscriptions'],
        validate: function (value) {
            console.log(this.startSubscription)
            console.log(new Date(value))
            console.log(new Date(value) - new Date(this.startSubscription))
            if ((new Date(value) - new Date(this.startSubscription)) < 0) {
                const e = new Error('how could the registion start before end?')
                e.name = 'CastError'
                throw e
            }
        },
    },
    date: {
        type: Date,
        required: [true, 'please enter when will the competition take place'],
        validate: function (value) {
            console.log(new Date(this.endSubscription))
            console.log(new Date(value))
            console.log(new Date(value) - new Date(this.endSubscription))
            if ((new Date(value) - new Date(this.endSubscription)) < 0) {
                const e = new Error('how could the competition start before you stop the registion?')
                e.name = 'CastError'
                throw e
            }
        }

    },
    stage: {
        type: String,
        trim: true,
        required: [true, 'please enter the stage of the competition']
    },
    poster: {
        type: String,
        trim: true,
        required: [true, 'please enter the official poster of the competition']
    },
    stopSubscription: {
        type: Boolean,
        default: true,
        validate: function (value) {
            console.log(new Date(this.date))
            console.log(Date.now())
            console.log(Date.now() - new Date(this.date))
            if (!value) {
                if((Date.now() - new Date(this.date)) > 0){
                    const e = new Error(' the compition already took place ,how do you want to open joining again?')
                    e.name = 'CastError'
                    throw e
                }
                this.showResults = false
                this.showSchedule = false
            }
        }
    },
    showSchedule: {
        type: Boolean,
        default: false,
        validate: function (value) {
            console.log(new Date(this.date))
            console.log(Date.now())
            console.log(Date.now() - new Date(this.date))
            if (value && !this.stopSubscription /*(Date.now() - new Date(this.date)) < 0*/) {
                const e = new Error('you can not show sechedule before stop the competition registration')
                e.name = 'CastError'
                throw e
            }
        }
    },
    showResults: {
        type: Boolean,
        default: false,
        validate: function (value) {
            console.log(new Date(this.date))
            console.log(Date.now())
            console.log(Date.now() - new Date(this.date))
            if (value && (Date.now() - new Date(this.date)) < 0) {
                const e = new Error('what s the result that you will show before the compition take place')
                e.name = 'CastError'
                throw e
            }
        }
    },
    enableRefree: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    }

})
CompetitionSchema.virtual('joins', {
    ref: 'subscriptions',
    localField: '_id',
    foreignField: 'competition'
})
const competitionModel = mongoose.model('competitions', CompetitionSchema)
module.exports = competitionModel