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
        expires: 18000
    }
})
tokenSchema.statics.creatToken = async function (data, lifeTime) {
    let token
    if (lifeTime) {
        console.log('creating token');


        // ةثفشصثش
        token =  jsonWebToken.sign(data, process.env.tokenPass)
        await tokenModel({owner:data.id,token}).save()
    } else {
        token =  jsonWebToken.sign(data, process.env.tokenPass, { expiresIn: '5h' })
        await tokenModel({owner:data.id,token,date: new Date()}).save()
    }
//    if(true) {
    return token
// }
}
const tokenModel = mongoose.model('tokens', tokenSchema)
module.exports = tokenModel