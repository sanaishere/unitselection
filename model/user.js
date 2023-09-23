const mongoose=require('mongoose')
let validator=require('validator')
const user=mongoose.Schema({
    subjectc:{
        type:mongoose.Schema.ObjectId
    },
        
   
    amount:{
        type:Number
    },
    subject:{
        type:mongoose.Schema.ObjectId,
        ref:'Subject'
    }
});