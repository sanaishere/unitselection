
const mongoose=require('mongoose')
let validator=require('validator')
const bcrypt=require('bcryptjs')
const adminschema=mongoose.Schema({

    username:{
        type:String,
        required:[true,'please enter username']
    },
    password:{
        type:String,
        required:[true,'please enter password']
    },
    email:{
        type:String,
        required:[true,'please enter password'],
        unique:true,
        validate:{
            validator:validator.isEmail,
            msg:'provide correct email'
        }
       
    },
    role:{
        type:String,
        default:'admin'
    },
    createdAt:{

    }
},


{ timestamps: true })
adminschema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
  this.password= await bcrypt.hash(this.password,salt)
  next()

})




module.exports=mongoose.model('Admin',adminschema)