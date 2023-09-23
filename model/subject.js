const mongoose=require('mongoose')

const subjects=mongoose.Schema({
    subjectcode:{
        type:String,
        maxlength:6,
        minlength:6,
    },
    groupcode:{
        type:String,
    },
    amount:{
        type:Number
    },
    
})
module.exports=mongoose.model('Subject',subjects)
