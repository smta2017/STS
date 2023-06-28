const mongoose=require('mongoose')
const PaymentSchema=mongoose.Schema({
 subscription:{
    type:mongoose.SchemaTypes.ObjectId,
    required:[true,'this payment for what?'],
    trim:true
 }
 
})
const paymentModel=mongoose.model('payments',PaymentSchema)
module.exports=paymentModel