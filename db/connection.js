const mongoose = require('mongoose')
try {
    mongoose.connect(process.env.DBconnectionURL, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true }).then(() => {
        console.log('database connected')
    })
} catch (e) {
    console.log(e)
}