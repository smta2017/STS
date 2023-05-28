const mongoose=require('mongoose')
const validator=require('validator')
// const jsonWebToken=require('jsonwebtoken')
const countryCodeslist=require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
const bcrypt=require('bcrypt')
const UserSchema=mongoose.Schema({
    // role:{//foreginKey to know what you can see or do
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref:'roles',
    //     required:[true,'please enter this employee position']
    // },
    firstName: {
        type: String,
        required: [true, 'please enter academy owner first name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    lastName: {
        type: String,
        required: [true, 'please enter academy owner first name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    mobileNumber: {
        type: String,
        required: [true, "please enter your phone number"],
        trim: true,
        unique: true,
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
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        // default:'12345'
        required: [true, 'the password is required field']
    },
    academyDetails:{//foregin key to know his academy if your role is academy
        type:mongoose.SchemaTypes.ObjectId,
        ref:'academies',
        // required:[function type() {
        //     return this.role == //you need to put the objectId of academy role
        // },'you are academy we need your academy details for registration']
    },
    suspended:{
        type:Boolean,
        default:false
    }
})
UserSchema.pre('save', function () {
    console.log(this.isModified('password'))
    if (this.isModified('password')) this.password = bcrypt.hashSync(this.password,12)
})
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.__v
    delete userObject.password
    return userObject
}
UserSchema.statics.logIn = async (loginData) => {
    let isUserExist
        if( loginData.countryCallingCode&&loginData.mobileNumber){
            isUserExist=await userModel.findOne({mobileNumber:countryCodeslist[loginData.countryCallingCode.substring(1)] + ":" + loginData.countryCallingCode +loginData.mobileNumber})
        }else if(loginData.email&&!isUserExist){
            isUserExist=await userModel.findOne({email:loginData.email})
        }else{
            const e=new Error('you did not send user email or phone number with the country code ')
            e.name='CastError'
            throw e
        }
        if(!isUserExist){
            const e=new Error('there is no user with such email or mobile number ')
            e.name='CastError'
            throw e
        }
        if(isUserExist.suspended){
            const e=new Error('your account has been blocked from  the website organizers please contact with us from our mail or contact us form ')
            e.name='Error'
            throw e
        }
    if (loginData.password) {
        console.log(loginData.password,isUserExist)
        if (!bcrypt.compareSync(loginData.password, isUserExist.password)) {
            const e=new Error('invalid password')
            e.name='CastError'
            throw e
        }
    } else {
        const e=new Error('there is no password to log you in,please enter your password')
        e.name='CastError'
        throw e
    }
    return isUserExist
}
UserSchema.virtual('joinedCompetions',{
    ref:'subscription',
    localField:'_id',
    foreignField:'subscriper'
})
const userModel=mongoose.model('users',UserSchema)
module.exports=userModel