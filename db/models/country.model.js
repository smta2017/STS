const mongoose=require('mongoose')
const CountrySchema=mongoose.Schema({
 countryName:{
    type:String,
    unique:true,
    required:[,true,'please enter the name of the country you want to add']
 },
 adminstrationFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 membershipFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 soloDancerFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 duoOrTrioDanceFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 groupDanceFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 soloSingerFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 duoOrTrioSingingFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 groupSingingFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 soloMusicianFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 duoOrTrioMusicFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 },
 groupMusicFees:{
   type:Number,
   required:[true,'this fees is required to manage the Subscriber academy fees'] 
 }
})
const countryModel=mongoose.model('countries',CountrySchema)
module.exports=countryModel