const mongoose=require('mongoose')
const SponsorSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'please enter the sponsor name'],
        trim:true
    },
    paragraph:{
        type:String,
        required:[true,'please enter what you want to say about this sponsor']
    },
    photo:{
        type:String,
        required:[true,'please enter the sponsor poster'],
        trim:true
    }
})
const sponsorModel=mongoose.model('sponsors',SponsorSchema)
module.exports=sponsorModel