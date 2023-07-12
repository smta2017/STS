const mongoose = require('mongoose');
const jsonWebToken = require('jsonwebtoken')
const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        trim: true,
        refPath: 'users'
    },
    date: {
        type: Date,
        expires: 3600
    }
})
tokenSchema.statics.createToken = async function (data, lifeTime) {
    let token
    if (lifeTime) {
        token = jsonWebToken.sign(data, process.env.tokenPass)
        await tokenModel({ owner: data.id, token }).save()
    } else {
        token = jsonWebToken.sign(data, process.env.tokenPass, { expiresIn: '1h' })
        await tokenModel({ owner: data.id, token, date: new Date() }).save()
    }
    //    if(true) {
    return token
    // }
}
const tokenModel = mongoose.model('tokens', tokenSchema)
module.exports = tokenModel