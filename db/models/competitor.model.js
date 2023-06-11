const mongoose=require('mongoose')
const moment=require('moment')
const validator=require('validator')
const CompetitorSchema=mongoose.Schema({
    qualifierSubscription:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'subscriptions',
        required:[true,'this competitor belong to which academy to competition subscription'],
        trim:true,
        immutable:true,
    },
    finalSubscription:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'subscriptions',
        trim:true,
    },
    firstName:{
        type:String,
        required:[true,'please enter the competitor name'],
        trim:true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    lastName:{
        type:String,
        required:[true,'please enter the competitor last name'],
        trim:true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    category:{
        type:String,
        enum:['dancer','musician','singer'],
        required:[true,'what is the category of this competitor'],
        lowercase: true
    },
    dateOfBirth:{
        type:Date,
        required:[true,'we need to know the competitor ']
    },
    rank:{
        type:String,
        // enum:[],
        set:function(v){
            if(this.dateOfBirth){
                return 'notsetted'
            }
            // if(){
            //     return
            // }else if(){
            //     return
            // }else{}
        }
    },
    mobileNumber: {
        type: String,
        required: [true, "please enter your phone number"],
        trim: true,
        validate(value) {
            let val = value.split(':')
            if (!validator.isMobilePhone(val[1], val[0])) {
                throw new Error('this mobile number invalid')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    gender: {
        type: String,
        required: [true, "enter the competitor's  gender"],
        enum: ['male', 'female'],
        trim: true,
        lowercase: true
    },
    passQualifier:{
        type: Boolean,
        default: false
    }
})
CompetitorSchema.pre('save', function () {
    if (this.isDirectModified('dateOfBirth')) this.rank= ""
})
const competitorModel=mongoose.model('competitors',CompetitorSchema)
module.exports=competitorModel