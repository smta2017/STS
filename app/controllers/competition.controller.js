const competitionModel = require('../../db/models/competition.model')
const { uploadfile } = require('../middlewares')
const Helper = require('../helper')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
class Competition {
    static add = (req, res) => {
            try {
                let image
                const upload = uploadfile('competition_posters')
                const uploadImage = upload.single('poster')
                uploadImage(req, res, async function (e) {
                    if (e instanceof multer.MulterError)
                        Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
                    else if (e) {
                        Helper.formatMyAPIRes(res, 500, false, e, e.message)
                    }
                    else {
                        try {
                            if (req.body.type == 'final') {
                                const isThereIsAnotherFinalInThisYear = await competitionModel.findOne({ type: req.body.type, year: req.body.year })
                                if (isThereIsAnotherFinalInThisYear) {
                                    const e = new Error('you already create the final of this year')
                                    e.name = 'CastError'
                                    throw e
                                }
                            } else if (req.body.type == 'qualifier') {
                                const isThereIsAnotherQualifierForThisCountryInThisYear = await competitionModel.findOne({ type: req.body.type, year: req.body.year, country: req.body.country })
                                if (isThereIsAnotherQualifierForThisCountryInThisYear) {
                                    const e = new Error('you already create the qaulifier for this country in this year')
                                    e.name = 'CastError'
                                    throw e
                                }
                            }
                            image = req.file.path.replace('statics\\', '')
                            image = image.replace(/\\/g, '/')
                            req.body.poster = image
                            const competition = await competitionModel.create(req.body)
                            // if (req.user.image != 'defaultuserimage.png') {
                            //     fs.unlinkSync(path.join(__dirname, '../../statics/' + req.user.image))
                            // }
                            Helper.formatMyAPIRes(res, 200, true, { file: req.file, competition }, `greate, you add a new competition ,don't forget to enable registration`)
                        }
                        catch (e) {
                            console.log(e)
                            if (fs.existsSync(path.join(__dirname, '../../statics/' + image))) {
                                fs.unlinkSync(path.join(__dirname, '../../statics/' + image))
                            }
                            Helper.formatMyAPIRes(res, 500, false, e, e.message)
                        }
                    }
                })
            } catch (e) {
                console.log(e)
                Helper.formatMyAPIRes(res, 500, false, e, e.message)
            }
    }
    static update = (req, res) => {
        try {
            let image
            const upload = uploadfile('competition_posters')
            const uploadImage = upload.single('poster')
            uploadImage(req, res, async function (e) {
                if (e instanceof multer.MulterError)
                    Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
                else if (e) {
                    Helper.formatMyAPIRes(res, 500, false, e, e.message)
                }
                else {
                    try {
                        let oldImage
                        const competition = await Helper.isThisIdExistInThisModel(req.params.id, competitionModel, 'competition')
                        if (req.file) {
                            image = req.file.path.replace('statics\\', '')
                            image = image.replace(/\\/g, '/')
                            req.body.photo = image
                            oldImage = competition.photo
                        }
                        for (let field in req.body) {
                            competition[field] = req.body[field]
                        }
                        const result = await competition.save()
                        if (fs.existsSync(path.join(__dirname, '../../statics/' + oldImage)) && req.file) {
                            fs.unlinkSync(path.join(__dirname, '../../statics/' + oldImage))
                        }
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file, result }, 'congrats,you update competition data successfully')
                    }
                    catch (e) {
                        console.log(e)
                        if (fs.existsSync(path.join(__dirname, '../../statics/' + image))) {
                            fs.unlinkSync(path.join(__dirname, '../../statics/' + image))
                        }
                        Helper.formatMyAPIRes(res, 500, false, e, e.message)
                    }
                }
            })
        } catch (e) {
            console.log(e)
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
    }  
    static delete = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const result = await competitionModel.findByIdAndDelete(req.params.id)
            if (!result) {
                const e = new Error('there is no such a competition')
                e.name = 'CastError'
                throw e
            }
            if (fs.existsSync(path.join(__dirname, '../../statics/' + result.photo))) {
                fs.unlinkSync(path.join(__dirname, '../../statics/' + result.photo))
            }
            if (true) {
                return result
            }
        }, 'you deleted competition successfully')
    }
    static getAll = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return competitionModel.find()//.populate('joinedAcademy')
        }, 'here are all your competitions')
    }
    static getOpenToRegister=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
            await req.user.populate('academyDetails')
            console.log(req.user.academyDetails.country)
            if(true){
            return competitionModel.find({country:req.user.academyDetails.country,stopSubscription:false})
            }
        },'there are the competition that you can join')
    }
    static getEnableRefreeComp=(req,res)=>{
        Helper.handlingMyFunction(req,res,(req)=>{
            return competitionModel.find({enableRefree:true,finished:false})
        },'there are the competition that need to be judged')
    }
}
module.exports = Competition