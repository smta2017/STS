const mongoose=require('mongoose')
const OwnerSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'please enter academy owner first name'],
        trim:true,
        minlength:3,
        match:/^[a-zA-z]{3,}$/
    },
    lastName:{
        type:String,
        required:[true,'please enter academy owner first name'],
        trim:true,
        minlength:3,
        match:/^[a-zA-z]{3,}$/
    },
    mobileNumber
})
const AcademySchema=mongoose.Schema({
country:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'countries',
    trim:true,
    required:[true,"please enter your country"],
}

})
const academyModel=mongoose.model('academies',AcademySchema)
module.exports=academyModel