const mongoose=require('mongoose')
PriceSchema=mongoose.Schema({
    country: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, 'this competition is a qualifier please enter where will it take place'],
        ref: 'countries'
    },
    price:{
        type:Number,
        min:0,
        required:[true,'please enter this product price for the country you added this product in']
    }
})
const ProductSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter the product name'],
        trim: true,
        maxlength:50
    },
    photo: {
        type: String,
        required: [true, 'please enter the sponsor poster'],
        trim: true
    },
    prices:{
        type:[PriceSchema],
        validate:(value)=>{
            if(value.length<=0){
                throw new Error('you need to add one country with the price of this product in this country  at least')
            }
        }
    }

})
const productModel=mongoose.model('products',ProductSchema)
module.exports=productModel