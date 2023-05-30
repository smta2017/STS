const mongoose=require('mongoose')
const NewsSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'please enter the news headline'],
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    paragraph:{
        type:String,
        required:[true,'please enter what the news say ']
    },
    photo:{
        type:String,
        required:[true,'please enter the news poster'],
        trim:true
    }
})
const newsModel=mongoose.model('news',NewsSchema)
module.exports=newsModel