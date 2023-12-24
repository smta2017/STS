const mongoose = require('mongoose')
const TabSchema = mongoose.Schema({
    tabId: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'please enter tab tag Id'],
        match: /^[a-zA-Z][\w:.-]*$/
    },
    tabName: {
        type: String,
        required: [true, 'please enter the tab name'],
        trim: true
    },
    routes: {
        type: [mongoose.SchemaTypes.ObjectId],
        trim: true,
        default: [],
        ref: 'routes'
    }
})
const tabModel = mongoose.model('tabs', TabSchema)
module.exports = tabModel