require('../db/connection')
const express=require('express')
const path=require('path')
const cors=require('cors')
const app=express()
// app.use(cors())
app.use(express.json({limit:'200mb'}))
app.use(express.urlencoded({extended:true,limit:'200mb'}))
app.use(express.static(path.join(__dirname,'../statics')))
 
//routes
const userRoutes=require('../routes/user.routes')
const countryRoutes=require('../routes/country.routes')
const sponsorRoutes=require('../routes/sponsor.routes')
const newsRoutes=require('../routes/news.routes')
const advertisingRoutes=require('../routes/advertising.routes')
const roleRoutes=require('../routes/role.routes')
app.use('/sts/role',roleRoutes)
app.use('/sts/advertising',advertisingRoutes)
app.use('/sts/news',newsRoutes)
app.use('/sts/sponsor',sponsorRoutes)
app.use('/sts/country',countryRoutes)
app.use('/sts/user',userRoutes)
module.exports=app