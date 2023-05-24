require('../db/connection')
const express=require('express')
const path=require('path')
const cors=require('cors')
const app=express()
// app.use(cors())
app.use(express.json({limit:'200mb'}))
app.use(express.urlencoded({extended:true,limit:'200mb'}))
app.use(express.static(path.join(__dirname,'../statics')))

module.exports=app