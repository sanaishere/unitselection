const Prof=require('../model/prof')
const Student=require('../model/student')
const Subject=require('../model/subject')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors')


let prsubs=[];
const addsubject=async(req,res)=>{

    const prid=req.user.userID
    const prof=await Prof.findOne({_id:prid})
    const {username,password,email}=prof
    const {sub}=req.body
    const exist=await Subject.findOne({sub})
    req.body.subject=exist._id

    if(!exist){
        throw new CustomError.NotFoundError('subject does not exist')
    }
    
    prsubs.push(req.body)
    const proff=await Prof.findOneAndUpdate({_id:prid},{username:username,password:password,email:email,subjects:prsubs},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json(proff)
}    
const getprofsubject=async(req,res)=>{
    const prid=req.user.userID
    const prof=await Prof.findOne({_id:prid}).select('subjects')
    res.status(StatusCodes.OK).json({prof})
    
}
const getprofstudent=async(req,res)=>{
    const prid=req.user.userID
    const prof=await Prof.findOne({_id:prid})
    const{username,password,email,subjects}=prof
    
    let array=[];
    let pp=[]
   // for (let subject of subjects){
const stu=await Student.find({subjects:subjects.Subject})
for (let student of stu){
const {stnumber,studentid}=student
array.push(stnumber)
console.log(stu)
prof.username=username;
prof.password=password;
prof.email=email;
prof.subjects=subjects
prof.profstudents=array;
await prof.save()
}
 //pp=await Prof.findOneAndUpdate({_id:prid},{username:prof.username,password:prof.password,email:prof.email,subjects:prof.subject,profstudents:array})
  //  }
    res.status(StatusCodes.OK).json(prof)
    
}
module.exports={
    addsubject,
    getprofstudent,
    getprofsubject
}