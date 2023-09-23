const mongoose=require('mongoose')
let validator=require('validator')
const bcrypt=require('bcryptjs')
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
});
const students=mongoose.Schema({
    stnumber:{
        type:String,
        minLength:9,
        maxLength:9,
    },
    studentid:{
        type:String,
       
        

    },
    student:{
        type:mongoose.Schema.ObjectId,
        ref:'Student'
    }
})
const profSchema=mongoose.Schema({
    username:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        validate:{
           validator: validator.isEmail,}
    },
    role:{
        type:String,
        default:'prof'
    },
    subjects:[subject],
    profstudents:{
        type:Array,
    }

})
profSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
  this.password= await bcrypt.hash(this.password,salt)
  next()

})



module.exports=mongoose.model('Prof',profSchema)