const mongoose=require('mongoose')
const validator=require('validator')
const jsonWebToken=require('jsonwebtoken')
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
        required: [true, 'the password is required field']
    },
    academyDetails:{//foregin key to know his academy if your role is academy
        type:mongoose.SchemaTypes.ObjectId,
        ref:'academies',
        // required:[function type() {
        //     return this.role == //you need to put the objectId of academy role
        // },'you are academy we need your academy details for registration']
    }
})
UserSchema.pre('save', function () {
    if (this.isModified('password')) this.password = bcrypt.hashSync(this.password,12)
})
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.__v
    delete userObject.password
    return userObject
}
UserSchema.statics.logIn = async (email, enterdPassword) => {
    const userData = await user.findOne({ email })
    if (!userData) {
        throw new Error('invalid email')
    }
    if (enterdPassword) {
        if (!bcrybt.compareSync(enterdPassword, userData.password)) {
            throw new Error('invalid password')
        }
    } else {
        throw new Error('invalid password')
    }
    return userData
}
UserSchema.virtual('joinedCompetions',{
    ref:'subscription',
    localField:'_id',
    foreignField:'subscriper'
})
const empolyeeModel=mongoose.model('empolyee',EmpolyeeSchema)
module.exports=empolyeeModel