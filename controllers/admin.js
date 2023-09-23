const Admin=require('../model/admin')
const Prof=require('../model/prof')
const Student=require('../model/student')
const Subject=require('../model/subject')
const {StatusCodes}=require('http-status-codes')
const CustomError=require('../errors')
const getadmin=async(req,res)=>{
const admin=await Admin.find({})
res.status(StatusCodes.OK).json({admin})

}
const addsubject=async(req,res)=>{
    



    
    const {subjectcode,groupcode,amount}=req.body
    if(!subjectcode&!groupcode&!amount){
throw new CustomError.NotFoundError('not found')  
 }
    const sub=await Subject.create(req.body)
    res.status(StatusCodes.CREATED).json({sub})
    
}



const getallsubjects=async(req,res)=>{
    const sub=await Subject.find({})
    res.status(StatusCodes.OK).json({sub})
    
}

const getsinglesubject=async(req,res)=>{

    const{id:subid}=req.params
    const sub=await Subject.findOne({_id:subid})
    res.status(StatusCodes.OK).json({sub})
}
const removesubject=async(req,res)=>{
    
}
const addstudent=async(req,res)=>{
    const student=await Student.create(req.body)
    res.status(StatusCodes.CREATED).json({student})

}
const removestudent=async(req,res)=>{
    
}

const getallstudents=async(req,res)=>{
    const student=await Student.find({})
    res.status(StatusCodes.OK).json({student})
}
const getsinglestudent=async(req,res)=>{
    const{id:stuid}=req.params
    const student=await Student.findOne({_id:stuid})
    res.status(StatusCodes.OK).json({student})
    

}
const getprofstudents=async(req,res)=>{
    const mystudents=await Prof.find({Subject})
}


const addprofessor=async(req,res)=>{
    const prof=await Prof.create(req.body)
    res.status(StatusCodes.CREATED).json({prof})
}
const getallprofessors=async(req,res)=>{
   const prof=await Prof.find({})
   res.status(StatusCodes.OK).json({prof})
}
const removeprofessor=async(req,res)=>{
    console.log('remove professor')
}
const getsingleprofessor=async(req,res)=>{
    const{id:profid}=req.params
    const prof=await Prof.findOne({_id:profid})
    res.status(StatusCodes.OK).json({prof})
}
module.exports={
    getadmin,
    addsubject,
    getallsubjects,
    getsinglesubject,
    removesubject,
    addprofessor,
    getallprofessors,
    getsingleprofessor,
    removeprofessor,
    addstudent,
    getallstudents,
    getsinglestudent,
    removestudent
}





