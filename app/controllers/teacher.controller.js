const teacherModel = require('../../db/models/teacher.model')
const countryCodeslist = require('country-codes-list').customList('countryCallingCode', '{officialLanguageCode}-{countryCode}')
const Helper = require('../helper')
class Teacher {
    static add = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            if (!req.body.countryCallingCode) {
                const e = new Error('we need you country calling code with your phone number to complete this registeration')
                e.name = 'ValidationError'
                throw e
            }
            if(req.user.role.toString()=='6480d5701c02f26cd6668987'/*academy role */){
                req.body.academy = req.user._id
            }else if(req.params.academyId&&!['6486bca99dd036cbf366140a', '6486bcef9dd036cbf366140e', '6486bd269dd036cbf3661410'].includes(req.user.role.toString())){
                req.body.academy=req.params.academyId
            }
            req.body.mobileNumber = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
            return teacherModel.create(req.body)
        }, 'congrats,you added new  teacher to your academy ')
    }
    static update = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const teacher = await Helper.isThisIdExistInThisModel(req.params.id, null, teacherModel, 'teacher')
            for (let field in req.body) {
                if (field == 'mobileNumber' && req.body[field]) {
                    if (req.body.countryCallingCode) {
                        req.body[field] = countryCodeslist[req.body.countryCallingCode.substring(1)] + ":" + req.body.countryCallingCode + req.body.mobileNumber
                    } else {
                        const e = new Error('we need the teacher country calling code to change his mobile number')
                        e.name = 'CastError'
                        throw e
                    }
                }
                if (!['_id', 'academy'].includes(field) && req.body[field]) { teacher[field] = req.body[field] }
            }
            if (true) {
                return teacher.save()
            }
        }, 'you update this teacher data successfully ')
    }
    static delete = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const result = await teacherModel.findByIdAndDelete(req.params.id)
            if (!result) {
                const e = new Error('there is no such a teacher')
                e.name = 'CastError'
                throw e
            }
            if (true) {
                return result
            }
        }, 'you deleted teacher successfully ')
    }
    static getAll = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            let academyID
            if (req.user.role == '6480d5701c02f26cd6668987') {
                academyID = req.user._id
            } else if (req.baseUrl + (req.route.path == '/' ? '' : req.route.path) == '/sts/teacher/:academyId') {
                academyID = req.params.academyId
            } else {
                const e = new Error('you need to know which academy teacher')
                e.name = 'CastError'
                throw e
            }
            return teacherModel.find({ academy: academyID })
        }, 'here are all your teachers')
    }
}
module.exports = Teacher