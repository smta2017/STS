const mongoose = require('mongoose')
const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please enter the news headline'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    paragraph: {
        type: String,
        required: [true, 'please enter what the news say ']
    },
    photo: {
        type: String,
        required: [true, 'please enter the news poster'],
        trim: true
    },
    type:{
        type:String,
        enum:['1','2','3','4','5','6'],
        required:[true,'where do you want this poster to be shown']
    }
})
const newsModel = mongoose.model('news', NewsSchema)
module.exports = newsModel