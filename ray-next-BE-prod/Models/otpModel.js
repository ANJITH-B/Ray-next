const mongoose= require("mongoose");


const otp = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },
    validity:{
        type:String,
    },
 
})

module.exports.otpSchema = mongoose.model("otp",otp)
