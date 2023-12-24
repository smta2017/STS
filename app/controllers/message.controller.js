const messageModel = require('../../db/models/message.model')
const Helper = require('../helper')
class Country {
    static add = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            if(req.user){
                req.body.owner=req.user._id
            }
            return messageModel.create(req.body)
        }, 'your message arrived successfully and we will reply to you ASAP')
    }
    // static update = (req, res) => {
    //     Helper.handlingMyFunction(req, res, async (req) => {
    //         const message = await Helper.isThisIdExistInThisModel(req.params.id, null, messageModel, 'message')
    //         for (let field in req.body) {
    //             if (!['_id', 'countryName'].includes(field) && req.body[field]) { country[field] = req.body[field] }
    //         }
    //         if (true) {
    //             return country.save()
    //         }
    //     }, 'you update this country successfully ')
    // }
    static delete = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const result = await messageModel.findByIdAndDelete(req.params.id)
            if (!result) {
                const e = new Error('this message is not exist ')
                e.name = 'CastError'
                throw e
            }
            if (true) {
                return result
            }
        }, 'you deleted message successfully ')
    }
    static getAll = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            const filter={}
           const onlyUsers=req.header('onlyUsers')
            if(onlyUsers){
                filter.owner={ $exists: true }
            }
            return messageModel.find(filter).populate({path:'owner',select:['firstName','lastName','email']})
        }, 'here are all your messages')
    }
}
module.exports = Country