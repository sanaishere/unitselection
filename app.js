const express=require('express')
const app=express()
const cookieparser=require('cookie-parser')
require('dotenv').config()
const connection=require('./connect/db')
const adminroute=require('./routes/admin')
const profroute=require('./routes/profroutes')
const studentroute=require('./routes/student')
app.use(express.json())
app.use(cookieparser('secret'))
app.use('/api/v1/admin',adminroute)
app.use('/api/v1/prof',profroute)
app.use('/api/v1/student',studentroute)
const port=process.env.PORT||5000
const start=async()=>{
  try{

  
  await connection(process.env.MONGO_URI)
  app.listen(port,()=>{
   
    console.log('connected to server')
})
  }catch(err){
    console.log(err)
  }
}
start()
