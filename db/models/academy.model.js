const mongoose = require('mongoose')
const OwnerSchema = mongoose.Schema({

})
const LocationSchema = mongoose.Schema({
    blockNum: {
        type: String,
        trim: true,
        required: [true, 'please enter all your loction details,you forget to enter your block number']
    },
    street: {
        type: String,
        trim: true,
        required: [true, 'please enter all your loction details,you forget to enter yourstreet ']
    },
    cityOrTown: {
        type: String,
        trim: true,
        required: [true, 'please enter all your loction details,you forget to enter your city or town ']
    },
    provinceOrState: {
        type: String,
        trim: true,
        required: [true, 'please enter all your loction details,you forget to enter your province Or state ']
    },
    postalCode: {
        type: String,
        trim: true, required: [true, 'we need to know your postal code,please'],
        match: /^\d{5}(-\d{4})?$/
    }
})
const AcademySchema = mongoose.Schema({
    country: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'countries',
        trim: true,
        immutable: true,
        required: [true, "please enter your country"],
    },
    schoolName: {
        type: String,
        required: true,
        trim: [true, 'please enter your academy name'],
        minlength: 3,
        match: /^[a-zA-z]{3,}$/
    },
    schoolLocation: {
        type: LocationSchema,
        required: [true, 'we need your school location to registration']
    },
})
AcademySchema.virtual('owner', {
    ref: 'users',
    localField: '_id',
    foreignField: 'academyDetails'
})
const academyModel = mongoose.model('academies', AcademySchema)
module.exports = academyModel