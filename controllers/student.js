const CustomError=require('../errors')
const Subject=require('../model/subject')
const Student=require('../model/student')
const Prof=require('../model/prof')
const {StatusCodes}=require('http-status-codes')
let prsubs=[];
let array=[];
const addsubject=async(req,res)=>{
    const prid=req.user.userID
    const students=await Student.findOne({_id:prid})
    const {stnumber,studentid,email}=students
    const {sub}=req.body
    const exist=await Subject.findOne({sub})
    
    req.body.subject=exist._id
   
   
 
    const prof=await Prof.find({subjects:{  $elemMatch:{subject:exist._id}}})

    
    console.log(prof)
   

    if(!exist){
        throw new CustomError.NotFoundError('subject does not exist')
    }
    
    prsubs.push(req.body)
    
    const stu=await Student.findOneAndUpdate({_id:prid},{stnumber:stnumber,studentid:studentid,email:email,subjects:prsubs},{new:true,runValidators:true})
    res.status(StatusCodes.OK).json(stu)
}
const getstusubject=async(req,res)=>{
    const prid=req.user.userID
    const stu=await Student.findOne({_id:prid}).select('subjects')
    res.status(StatusCodes.OK).json({stu})
}
module.exports={
    addsubject,
    getstusubject

}