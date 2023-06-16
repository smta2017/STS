require('dotenv').config()
const app=require('./app/config')
const PORT=process.env.PORT||4000

app.listen(PORT,()=>{
    console.log('now we listen to port '+PORT)
})