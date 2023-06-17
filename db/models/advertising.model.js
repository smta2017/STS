const mongoose = require('mongoose')
const AdvertisingSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please enter the advertising title'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    paragraph: {
        type: String,
        required: [true, 'please enter what the advertising content']
    },
    photo: {
        type: String,
        required: [true, 'please enter the advertising poster'],
        trim: true
    }
})
const advertisingModel = mongoose.model('advertising', AdvertisingSchema)
module.exports = advertisingModel