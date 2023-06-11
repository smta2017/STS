const { uploadfile } = require('../middlewares')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const entryModel = require('../../db/models/entry.model')
const Helper = require('../helper')
class Entry {
    static addEntry = (req, res) => {
        try {
            let music
            const upload = uploadfile('entries_music',['audio/mpeg','audio/webm'])
            const uploadImage = upload.single('music')
            uploadImage(req, res, async function (e) {
                if (e instanceof multer.MulterError)
                    Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
                else if (e) {
                    Helper.formatMyAPIRes(res, 500, false, e, e.message)
                }
                else {
                    try {
                        music = req.file.path.replace('statics\\', '')
                        music = music.replace(/\\/g, '/')
                        // req.body.competitors=['6484cc422176b3a2fc16a1eb','6485a4c3c081a4fa0250eba7']
                        req.body.music = music
                        const entry = await entryModel.create(req.body)
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file, entry }, `well done you addd new entry perpare for it and don't forget to pay it's fees`)
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
    static addCompetitorToEntry=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
            const entry=await Helper.isThisIdExistInThisModel(req.params.entryId,['competitors','qualifierSubscription','competitorsCategories'],entryModel,'entry')
            await req.user.isThisSubscriptionBelongToMe(entry.qualifierSubscription)
            entry.competitors.push(req.params.competitorId)
            if(true){
                return entry.save()
            }
        },'you added competitor successfully')
    }
    static removeCompetitorFromEntry=(req,res)=>{
        Helper.handlingMyFunction(req,res,async(req)=>{
            const entry=await Helper.isThisIdExistInThisModel(req.params.entryId,['competitors','qualifierSubscription','competitorsCategories'],entryModel,'entry')
            await req.user.isThisSubscriptionBelongToMe(entry.qualifierSubscription)
            const i=entry.competitors.findIndex(competitor=>competitor._id.toString()==req.params.competitorId)
            if(i==-1){
                const e = new Error('this competitor is not in this entry already')
                    e.name = 'Error'
                    throw e
            }
            entry.competitors.splice(i, 1)
            if(true){
                return entry.save()
            }
        },'you added competitor successfully')
    }
}
module.exports = Entry