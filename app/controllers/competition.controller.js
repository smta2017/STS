const competitionModel = require('../../db/models/competition.model')
const { uploadfile } = require('../middlewares')
const Helper = require('../helper')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const subscriptionModel = require('../../db/models/subscription.model')
class Competition {
    static add = (req, res) => {
        try {
            let image
            const upload = uploadfile('competition_posters', ['image/png', 'image/webp', 'image/apng', 'image/gif', 'image/jpeg'])
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
                        if (req.file) {
                            image = req.file.path.replace('statics\\', '')
                            image = image.replace(/\\/g, '/')
                            req.body.poster = image
                        }
                        const competition = await competitionModel.create(req.body)
                        // if (req.user.image != 'defaultuserimage.png') {
                        //     fs.unlinkSync(path.join(__dirname, '../../statics/' + req.user.image))
                        // }
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file ? req.file : 'there is file uploaded', competition }, `greate, you add a new competition ,don't forget to enable registration`)
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
            const upload = uploadfile('competition_posters', ['image/png', 'image/webp', 'image/apng', 'image/gif', 'image/jpeg'])
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
                        const competition = await Helper.isThisIdExistInThisModel(req.params.id, null, competitionModel, 'competition')
                        if (req.file) {
                            image = req.file.path.replace('statics\\', '')
                            image = image.replace(/\\/g, '/')
                            req.body.photo = image
                            oldImage = competition.photo
                        }
                        for (let field in req.body) {
                            if (!['country', 'type', 'year', '_id'].includes(field) && (req.body[field]||req.body[field]==false)) { competition[field] = req.body[field] }
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
            const result = await competitionModel.deleteCompetition(req.params.id)
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
        Helper.handlingMyFunction(req, res, async(req) => {
            const comps=await competitionModel.find().populate({path:'country',select:['countryName']})
            const result=comps.map(comp=>{
                const returedcomp=comp.toObject()
                returedcomp.otherCountry=comp.otherCountry
                return returedcomp
            })
            if(true){return result}
        }, 'here are all your competitions')
    }
    static getOpenToRegister = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await req.user.populate('academyDetails')
            const openToSubScription = await competitionModel.find({ stopSubscription: false }).or([{ country: req.user.academyDetails.country, type: 'qualifier' }, { type: 'final' }]).populate('joins')
            if (!openToSubScription) {
                const e = new Error('there is no competitions open to register in')
                e.name = 'Error'
                throw e
            }
            const openToSubScriptionButIHaveNotSubscripedYet = openToSubScription.filter(comp => {
                const alreadyJoined = comp.joins.find(join => join.academy == req.user.id)
                return !alreadyJoined
            })
            // if(true){return openToSubScriptionButIHaveNotSubscripedYet}
            const availableCompetitions = openToSubScriptionButIHaveNotSubscripedYet.filter(comp => comp.type == 'qualifier')
            const finalcompetitions = openToSubScriptionButIHaveNotSubscripedYet.filter(comp => comp.type == 'final')
            await Promise.all(
                finalcompetitions.map(async (comp) => {
                    const userQualifier = await competitionModel.findOne({ year: comp.year, country: req.user.academyDetails.country })
                    if (userQualifier) {
                        const subscription = await subscriptionModel.findOne({ academy: req.user._id, competition: userQualifier._id })
                        if (subscription && subscription.haveASuccessededEntry) {
                            availableCompetitions.push(comp)
                        }
                    }
                })
            )
            if (true) {
                return availableCompetitions
            }
        }, 'there are the competition that you can join')
    }
    static getEnableRefreeComp = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return competitionModel.find({ enableRefree: true, finished: false })
        }, 'there are the competition that need to be judged')
    }
}
module.exports = Competition