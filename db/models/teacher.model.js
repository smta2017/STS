const mongoose = require('mongoose')
const validator = require('validator')
const moment=require('moment')
const TeacherSchema = mongoose.Schema({
    academy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: [true, 'this teacher belong to which academy'],
        trim: true,
        immutable: true,
    },
    firstName: {
        type: String,
        required: [true, 'please enter the teacher name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    lastName: {
        type: String,
        required: [true, 'please enter the teacher last name'],
        trim: true,
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
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
        required: [true,'please enter the teacher email'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email address')
            }
        }
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'we need to know the teacher date of birth '],
    }
}, {
    toJSON: { virtuals: true },// <-- include virtuals in `JSON.stringify()`
    toObject: { virtual: true }
})
TeacherSchema.virtual('age')
    .get(function () {
        const age = moment(Date.now()).diff(moment(this.dateOfBirth), 'years', true)
        console.log(age)
        return Math.floor(age)
    });
const teacherModel = mongoose.model('teachers', TeacherSchema)
module.exports = teacherModel