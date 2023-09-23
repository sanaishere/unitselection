const url=require('url')
const Admin=require('../model/admin')
const Student=require('../model/student')
const Prof=require('../model/prof')
const {StatusCodes}=require('http-status-codes')
const {tokenuser,createjwt,isTokenvalid,attachcookie}=require('../jwt/attach')
const CustomError=require('../errors')
const loginadmin=async(req,res)=>{

    const {username,password,email}=req.body
    
    
   // if(req.url.includes('admin')){
        
 const admin=await Admin.findOne({email:email})
 if(!admin){
    throw new CustomError.BadRequestError('have not registered')
 }
 const token=tokenuser({user:admin})
 const create=createjwt({token})
 attachcookie({res,create})

 res.status(StatusCodes.OK).json({msg:admin})

}
 const loginprof=async(req,res)=>{

    const {username,password,email}=req.body
    
    
   // if(req.url.includes('admin')){
        
 const prof=await Prof.findOne({email:email})
 if(!prof){
    throw new CustomError.BadRequestError('have not registered')
 }
    
    

    
    const token=tokenuser({user:prof})
    const create=createjwt({token})
    attachcookie({res,create})

    res.status(StatusCodes.OK).json({msg:prof})
}

const loginstudent=async(req,res)=>{

    const {stnumber,studentid,email}=req.body
    
    
   // if(req.url.includes('admin')){
        
 const student=await Student.findOne({email:email})
 if(!student){
    throw new CustomError.BadRequestError('have not registered')
 }
 const token=tokenuser({user:student})
 const create=createjwt({token})
 attachcookie({res,create})

 res.status(StatusCodes.OK).json({msg:student})

}





const register=async(req,res)=>{

    const {email}=req.body;
    let exist={}
    if(req.url.includes('admin')){
         exist=await Admin.findOne({email:email})
    }
    if(req.url.includes('prof')){
        exist=await Prof.findOne({email:email})
    }
    if(req.url.includes('student')){
        exist=await Student.findOne({email:email})
    }
    if(exist){
       throw new Error('already exists')
    }
   
    

    const admin=await Admin.create(req.body)
    const token=tokenuser({user:admin})
    const create=createjwt({token})
    attachcookie({res,create})

    res.status(StatusCodes.CREATED).json({msg:admin})





}
module.exports={
    register,loginadmin,loginprof,loginstudent
}