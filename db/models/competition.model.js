const mongoose=require('mongoose')
const CompetitionSchema=mongoose.Schema({
year:{
    type:Number,
    min:2023,
    required:[true,'please enter the year that the competition will take place']
},
type:{
    type:String,
    enum:['final','qualifier'],
    required:[true,'please enter what is the type of this new competition'],
    trim:true
},
country:{
    type:mongoose.SchemaTypes.ObjectId,
    required:[function checkType(){
        return this.type=='qualifier'
    },'this competition is a qualifier please enter where will it take place'],
    ref:'countries'
},
startSubscription:{
    type:Date,
    required:[true,'please enter when will the competition start to have Subscriptions']
},
endSubscription:{
    type:Date,
    required:[true,'please enter when will the competition stop to have Subscriptions']
},
date:{
    type:Date,
    required:[true,'please enter when will the competition take place']
},
stage:{
    type:String,
    trim:true,
    required:[true,'please enter the stage of the competition']
},
poster:{
    type:String,
    trim:true,
    required:[true,'please enter the official poster of the competition']
},
stopSubscription:{
    type:Boolean,
    default:false
},
// showSchedule:{
//     type:Boolean,
//     default:false,
//     validate:(value)=>{
//         if(value&&){

//         }
//     }
// },
showResults:{
    type:Boolean,
    default:false
},
enableRefree:{
    type:Boolean,
    default:false 
}
})
const competitionModel=mongoose.model('competitions',CompetitionSchema)
module.exports=competitionModel