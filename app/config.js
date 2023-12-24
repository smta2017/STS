require('../db/connection')
const express = require('express')
const path = require('path')
const fs=require('fs')
const cors = require('cors')
const app = express()
const hbs=require('hbs')
const countrylist=require('country-codes-list')//.customList
app.set("view engine","hbs")
app.set("views",path.join(__dirname,'../views'))
app.use(cors())
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ extended: true, limit: '200mb' }))
app.get("/entries_vedios/:vediopath", function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = req.params.vediopath;
    const videoSize = fs.statSync(path.join(__dirname,'../statics/entries_vedios/'+videoPath)).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(path.join(__dirname,'../statics/entries_vedios/'+videoPath), { start, end });
    videoStream.pipe(res);
})
app.use(express.static(path.join(__dirname, '../statics')))
//routes
app.use(express.static(path.join(__dirname, '../statics/STS-Frontend-Website',)))
// app.get('/',(req,res)=>{
//     res.status(200).sendFile(path.join(__dirname,'../statics/STS-Frontend-Website/STS Website.html'))
// })
app.get('/sts/allcurrencies',(req,res)=>{
    res.status(200).json(countrylist.customList('currencyNameEn','{currencyCode}'))
})
const userRoutes = require('../routes/user.routes')
const countryRoutes = require('../routes/country.routes')
const sponsorRoutes = require('../routes/sponsor.routes')
const newsRoutes = require('../routes/news.routes')
const advertisingRoutes = require('../routes/advertising.routes')
const roleRoutes = require('../routes/role.routes')
const competitionRoutes = require('../routes/competition.routes')
const subscriptionRoutes = require('../routes/subscription.routes')
const competitorRoutes = require('../routes/competitor.routes')
const entryRoutes = require('../routes/entry.routes')
const teacherRoutes = require('../routes/teacher.routes')
const productRoutes = require('../routes/product.routes')
const messageRoutes = require('../routes/message.routes')
const paymentRoutes=require('../routes/payment.routes')
app.use('/sts/payment',paymentRoutes)
app.use('/sts/message', messageRoutes)
app.use('/sts/product', productRoutes)
app.use('/sts/teacher', teacherRoutes)
app.use('/sts/entry', entryRoutes)
app.use('/sts/competitor', competitorRoutes)
app.use('/sts/subscription', subscriptionRoutes)
app.use('/sts/competition', competitionRoutes)
app.use('/sts/role', roleRoutes)
app.use('/sts/advertising', advertisingRoutes)
app.use('/sts/news', newsRoutes)
app.use('/sts/sponsor', sponsorRoutes)
app.use('/sts/country', countryRoutes)
app.use('/sts/user', userRoutes)
module.exports = app