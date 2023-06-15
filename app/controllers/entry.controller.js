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
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file ? req.file : 'no file uploaded', entry }, `well done you addd new entry perpare for it and don't forget to pay it's fees`)
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
            let projection=null
            filter[subscription.competition.type + 'Subscription'] = req.params.subscriptionId
            if (req.baseUrl + (req.route.path == '/' ? '' : req.route.path) == '/sts/entry/schedual/:subscriptionId') {
                projection=[subscription.competition.type+'ShowDate','name',subscription.competition.type+'Subscription']
                filter[subscription.competition.type+'ShowDate']={$nin:[null,'']}
            }
            if (true) { return entryModel.find(filter,projection).populate({path:subscription.competition.type+'Subscription',populate:{path:'academy',populate:'academyDetails'}}) }
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
    static getAllCompetitionEntries = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            const allCompetitonSubscripetition = await subscriptionModel.find({ competition: req.params.compId }, ['_id', 'competiton']).populate('competition')
            if (allCompetitonSubscripetition.length <= 0) {
                const e = new Error('there is no acaedmy joins this competition')
                e.name = 'Error'
                throw e
            }
            const subscriptionArray = allCompetitonSubscripetition.map(sub => sub._id)
            const filter = {}
            filter[allCompetitonSubscripetition[0].competition.type + 'Subscription'] = { $in: subscriptionArray }
            let projection=null
            if (req.baseUrl + (req.route.path == '/' ? '' : req.route.path) == '/sts/entry/completeschedule/:compId') {
                projection = [allCompetitonSubscripetition[0].competition.type+'ShowDate',allCompetitonSubscripetition[0].competition.type+'Subscription','name']
                if(req.user.role.toString()=='6480d5701c02f26cd6668987'/*academy role id */){filter[allCompetitonSubscripetition[0].competition.type + 'ShowDate']= { $nin: [ null, "" ] }}
            }else if(req.baseUrl + (req.route.path == '/' ? '' : req.route.path) == '/sts/entry/completeresult/:compId'){
              if(['6486bca99dd036cbf366140a', '6486bcef9dd036cbf366140e', '6486bd269dd036cbf3661410'].includes(req.user.role.toString())) { /*refree roles ids */
                await req.user.populate('role')
                console.log(allCompetitonSubscripetition[0].competition.type+req.user.role.role)
                projection=[allCompetitonSubscripetition[0].competition.type+req.user.role.role,allCompetitonSubscripetition[0].competition.type+'Subscription','name']
                filter[allCompetitonSubscripetition[0].competition.type+req.user.role.role]={ $exists:false }
               }else{
                projection=[allCompetitonSubscripetition[0].competition.type+'Refree1',allCompetitonSubscripetition[0].competition.type+'Refree2',allCompetitonSubscripetition[0].competition.type+'Refree3',allCompetitonSubscripetition[0].competition.type+'Subscription','name']
               }
            }
            if (true) { return entryModel.find(filter,projection).populate({path:allCompetitonSubscripetition[0].competition.type+'Subscription',projection:['academy'],populate:{path:'academy'}}) }
        }, 'there are all this competition entries')
    }
    // static addShowDate=()=>{
    //     Helper.handlingMyFunction(req,res,(req)=>{},message)
    // }
    static addAdminData = (req, res) => {
        Helper.handlingMyFunction(req, res, async (req) => {
            await req.user.populate('role')
            const type = (await Helper.isThisIdExistInThisModel(req.params.subscriptionId, ['competition'], subscriptionModel, 'subscription', { path: 'competition' })).competition.type
            const entry = await Helper.isThisIdExistInThisModel(req.params.entryId, null, entryModel, 'entry')
            if (['6486bca99dd036cbf366140a', '6486bcef9dd036cbf366140e', '6486bd269dd036cbf3661410'].includes(req.user.role._id.toString())) {/*refree roles ids */
                if (!req.body.degree) {
                    const e = new Error('we did not recieve any degree to record')
                    e.name = 'CastError'
                    throw e
                }
                entry[type + req.user.role.role] = req.body.degree
            } else {
                console.log(req.body)
                for (let field in req.body) {
                    console.log(type + field)
                    entry[type + field] = req.body[field]
                }
            }

            if (true) { return entry.save() }
        }, 'you data added successfully')
    }
}
module.exports = Entry