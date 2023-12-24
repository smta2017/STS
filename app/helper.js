class Helper {
    static formatMyAPIRes = (res, resStatus, apiStatus, data, apiMessage) => {
        return res.status(resStatus).send({ apiStatus, data, apiMessage })
    }
    static handlingMyFunction = async (req, res, fun, message) => {
        try {
            let result = await fun(req)
            return this.formatMyAPIRes(res, 200, true, result, message)
        } catch (e) {
            if (e.name == 'Error') {
                return this.formatMyAPIRes(res, 200, false,{ error:e.stack,route:req.baseUrl + (req.route.path == '/' ? '' : req.route.path),method:req.method,user:req.user?req.user._id:undefined}, e.message)
            } else if (e.name == 'MongoServerError' || e.name == 'ValidationError' || e.name == 'CastError') {
                 return this.formatMyAPIRes(res, 400, false,{ error:e.stack,route:req.baseUrl + (req.route.path == '/' ? '' : req.route.path),method:req.method,user:req.user?req.user._id:undefined}, e.message)
            } else {
                 return this.formatMyAPIRes(res, 500, false,{ error:e.stack,route:req.baseUrl + (req.route.path == '/' ? '' : req.route.path),method:req.method,user:req.user?req.user._id:undefined}, e.message)
            }
        }
    }
    static isThisIdExistInThisModel = async (id, projection, model, modelName, populate, anotherpopulate) => {
        let exist
        if (populate && anotherpopulate) {
            exist = await model.findById(id, projection).populate(populate).populate(anotherpopulate)
        } else if (populate && !anotherpopulate) {
            exist = await model.findById(id, projection).populate(populate)
        } else {
            exist = await model.findById(id, projection)
        }
        if (exist) {
            return exist
        } else {
            const e = new Error(`this ${modelName} does not exist`)
            e.name = 'ValidationError'
            throw e
        }
    }
}
module.exports = Helper