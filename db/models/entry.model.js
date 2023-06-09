const mongoose=require('mongoose')
const EntrySchema=mongoose.Schema({

})
const entryModel=mongoose.model('entries',EntrySchema)
module.exports=entryModel