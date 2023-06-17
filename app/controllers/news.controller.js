const newsModel = require('../../db/models/news.model')
const Helper = require('../helper')
const fs = require('fs')
const { uploadfile } = require('../middlewares')
const multer = require('multer')
const path = require('path')
class News {
    static add = (req, res) => {
        try {
            let image
            const upload = uploadfile('news_posters', ['image/png', 'image/webp', 'image/apng', 'image/gif', 'image/jpeg'])
            const uploadImage = upload.single('photo')
            uploadImage(req, res, async function (e) {
                if (e instanceof multer.MulterError)
                    Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
                else if (e) {
                    Helper.formatMyAPIRes(res, 500, false, e, e.message)
                }
                else {
                    try {
                        if (req.file) {
                            image = req.file.path.replace('statics\\', '')
                            image = image.replace(/\\/g, '/')
                            req.body.photo = image
                        }
                        const news = await newsModel.create(req.body)
                        // if (req.user.image != 'defaultuserimage.png') {
                        //     fs.unlinkSync(path.join(__dirname, '../../statics/' + req.user.image))
                        // }
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file ? req.file : 'there is file uploaded', news }, 'you added new news successfully')
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
            const upload = uploadfile('news_posters', ['image/png', 'image/webp', 'image/apng', 'image/gif', 'image/jpeg'])
            const uploadImage = upload.single('photo')
            uploadImage(req, res, async function (e) {
                if (e instanceof multer.MulterError)
                    Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
                else if (e) {
                    Helper.formatMyAPIRes(res, 500, false, e, e.message)
                }
                else {
                    try {
                        let oldImage
                        const news = await Helper.isThisIdExistInThisModel(req.params.id, null, newsModel, 'news')
                        if (req.file) {
                            image = req.file.path.replace('statics\\', '')
                            image = image.replace(/\\/g, '/')
                            req.body.photo = image
                            oldImage = news.photo
                        }
                        for (let field in req.body) {
                            news[field] = req.body[field]
                        }
                        const result = await news.save()
                        if (fs.existsSync(path.join(__dirname, '../../statics/' + oldImage)) && req.file) {
                            fs.unlinkSync(path.join(__dirname, '../../statics/' + oldImage))
                        }
                        Helper.formatMyAPIRes(res, 200, true, { file: req.file, result }, 'congrats,you update news data successfully')
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
            const result = await newsModel.findByIdAndDelete(req.params.id)
            if (!result) {
                const e = new Error('there is no such a news')
                e.name = 'CastError'
                throw e
            }
            if (fs.existsSync(path.join(__dirname, '../../statics/' + result.photo))) {
                fs.unlinkSync(path.join(__dirname, '../../statics/' + result.photo))
            }
            if (true) {
                return result
            }
        }, 'you deleted news successfully')
    }
    static getAll = (req, res) => {
        Helper.handlingMyFunction(req, res, (req) => {
            return newsModel.find()
        }, 'here are all your news')
    }
}
module.exports = News