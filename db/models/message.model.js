const mongoose=require('mongoose')
const validator=require('validator')
const MessageSchema=mongoose.Schema({
    firstName: {
        type: String,
        required: [function(){
            if(this.owner){
                return false
            }else{
                return true
            }
        }, 'please enter the teacher name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    lastName: {
        type: String,
        required: [function(){
            if(this.owner){
                return false
            }else{
                return true
            }}, 'please enter the teacher last name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [function(){
            if(this.owner){
                return false
            }else{
                return true
            }},'please enter the teacher email'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    message:{
        type:String,
        required:true
    },
    owner:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required:[function(){
            if(this.firstName&&this.lastName&&this.email){
                return false
            }else{
                return true
            }},'we need youe name and email or your sign up']
    }
})
const messageModel=mongoose.model('messages',MessageSchema)
module.exports=messageModel