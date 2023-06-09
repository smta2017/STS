const mongoose = require('mongoose')

const SubscriptionSchema = mongoose.Schema({
competition:{
    type:mongoose.SchemaTypes.ObjectId,
    required:[true,'what is the competition that youwant to join'],
    ref:'competitions',
    trim: true,
    immutable:true,
},
academy:{
    type:mongoose.SchemaTypes.ObjectId,
    required:[true,'what is the competition that youwant to join'],
    ref:'users',
    trim: true,
    immutable:true
},
subscriptionDate:{
    type:Date,
    default:Date.now()
},
haveASuccessededEntry:{
    type: Boolean,
    default: false
}
})
const subscriptionModel = mongoose.model('subscriptions', SubscriptionSchema)
module.exports = subscriptionModel