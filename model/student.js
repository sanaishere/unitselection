
const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')

const subject=mongoose.Schema({
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
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:'Subject'
    }
})
const studentSchema=mongoose.Schema({
    stnumber:{
        type:String,
        minLength:9,
        maxLength:9,
    },
    studentid:{
        type:String,
       
       // maxLength:10,

    },
    email:{
        type:String,

    },
    role:{
        type:String,
        default:'student'
    },
    subjects:[subject],

    unitsum:{
        type:Number,

    }



})

studentSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.studentid=await bcrypt.hash(this.studentid,salt)
    next()
})
module.exports=mongoose.model('Student',studentSchema)
