const mongoose=require('mongoose')
const CountrySchema=mongoose.Schema({
 
})
const countryModel=mongoose.model('countries',CountrySchema)
module.exports=countryModel