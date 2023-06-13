const { uploadfile } = require('../middlewares')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const entryModel = require('../../db/models/entry.model')
const Helper = require('../helper')
const subscriptionModel = require('../../db/models/subscription.model')
const competitionModel = require('../../db/models/competition.model')
class Entry {
    static addEntry = (req, res) => {
        try {
            let music
            const upload = uploadfile('entries_music', ['audio/mpeg', 'audio/webm'])
            const uploadImage = upload.single('music')
            uploadImage(req, res, async function (e) {
                if (e instanceof multer.MulterError)
                    Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
                else if (e) {
                    Helper.formatMyAPIRes(res, 500, false, e, e.message)
                }
                else {
                    try {
                        if (req.file) {
                            music = req.file.path.replace('statics\\', '')
                            music = music.replace(/\\/g, '/')
                            // req.body.competitors=['6484cc422176b3a2fc16a1eb','6485a4c3c081a4fa0250eba7']
                            req.body.music = music
                        }
                        const entry = await entryModel.create(req.body)
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file?req.file:'no file uploaded', entry }, `well done you addd new entry perpare for it and don't forget to pay it's fees`)
                    }
                    catch (e) {
                        console.log(e)
                        if (fs.existsSync(path.join(__dirname, '../../statics/' + music))) {
                            fs.unlinkSync(path.join(__dirname, '../../statics/' + music))
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
    static addCompetitorToEntry = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const entry = await Helper.isThisIdExistInThisModel(req.params.entryId, ['competitors', 'qualifierSubscription', 'competitorsCategories'], entryModel, 'entry')
            await req.user.isThisSubscriptionBelongToMe(entry.qualifierSubscription)
            entry.competitors.push(req.params.competitorId)
            if (true) {
                return entry.save()
            }
        }, 'you added competitor successfully')
    }
    static removeCompetitorFromEntry = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const entry = await Helper.isThisIdExistInThisModel(req.params.entryId, ['competitors', 'qualifierSubscription', 'competitorsCategories'], entryModel, 'entry')
            await req.user.isThisSubscriptionBelongToMe(entry.qualifierSubscription)
            const i = entry.competitors.findIndex(competitor => competitor._id.toString() == req.params.competitorId)
            if (i == -1) {
                const e = new Error('this competitor is not in this entry already')
                e.name = 'Error'
                throw e
            }
            entry.competitors.splice(i, 1)
            if (true) {
                return entry.save()
            }
        }, 'you added competitor successfully')
    }
    static allentries = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId, ['competition'], subscriptionModel, 'subscription', 'competition')
            const filter = {}
            filter[subscription.competition.type + 'Subscription'] = req.params.subscriptionId
            if (true) { return entryModel.find(filter) }
        }, 'there is all your recorded entries for this competition')
    }
    static allentriesByCategory = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId, ['competition'], subscriptionModel, 'subscription', 'competition')
            const filter = {}
            filter[subscription.competition.type + 'Subscription'] = req.params.subscriptionId
            filter.competitorsCategories = req.params.category
            if (true) { return entryModel.find(filter) }
        }, 'there is all your recorded entries for this competition')
    }
    static delete = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const result = await entryModel.findByIdAndDelete(req.params.entryId)
            if (!result) {
                const e = new Error('there is no such a news')
                e.name = 'CastError'
                throw e
            }
            if (fs.existsSync(path.join(__dirname, '../../statics/' + result.music))) {
                fs.unlinkSync(path.join(__dirname, '../../statics/' + result.music))
            }
            if (true) {
                return result
            }
        }, "you edit your entry name and music successfully")
    }
    static edit = (req, res) => {
        try {
            let music
            const upload = uploadfile('entries_music', ['audio/mpeg', 'audio/webm'])
            const uploadImage = upload.single('music')
            uploadImage(req, res, async function (e) {
                if (e instanceof multer.MulterError)
                    Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
                else if (e) {
                    Helper.formatMyAPIRes(res, 500, false, e, e.message)
                }
                else {
                    try {
                        let oldMusic
                        const entry = await Helper.isThisIdExistInThisModel(req.params.entryId, null, entryModel, 'entry')
                        if (req.file) {
                            music = req.file.path.replace('statics\\', '')
                            music = music.replace(/\\/g, '/')
                            req.body.music = music
                            oldMusic = entry.music
                        }
                        for (let field in req.body) {
                            entry[field] = req.body[field]
                        }
                        const result = await entry.save()
                        if (fs.existsSync(path.join(__dirname, '../../statics/' + oldMusic)) && req.file) {
                            fs.unlinkSync(path.join(__dirname, '../../statics/' + oldMusic))
                        }
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file, result }, 'congrats,you update news data successfully')
                    }
                    catch (e) {
                        console.log(e)
                        if (fs.existsSync(path.join(__dirname, '../../statics/' + music))) {
                            fs.unlinkSync(path.join(__dirname, '../../statics/' + music))
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
    static getAllCompetitionEntries=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
            const allCompetitonSubscripetition=await subscriptionModel.find({competition:req.params.compId},['_id','competiton']).populate('competition')
            if(allCompetitonSubscripetition.length<=0){
                const e = new Error('there is no acaedmy joins this competition')
                e.name = 'Error'
                throw e
            }
            const subscriptionArray=allCompetitonSubscripetition.map(sub=>sub._id)
            const filter={}
            filter[allCompetitonSubscripetition[0].competition.type+'Subscription']={$in:subscriptionArray}
            let data
            if(req.baseUrl + (req.route.path == '/' ? '' : req.route.path)=='/sts/entry/allcompetition/:compId'){
                data=entryModel.find(filter)
            }
            if(true){return data}
        },'there are all this competition entries')
    }
    static addShowDate=()=>{
        Helper.handlingMyFunction(req,res,(req)=>{},message)
    }
}
module.exports = Entry