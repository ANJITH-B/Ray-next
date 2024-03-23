const mongoose= require("mongoose");


const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    company:{
        type:String,
    },
    profession:{
        type:String,
    },
    region:{
        type:String,
    },
    state:{
        type:String,
    },
    verified:{
        type: Boolean,
        default: false
    },
    secret_code:{
        type:String,
    },
    agentID:{
        type:String,
        required:true
    }
})

module.exports.userSchema = mongoose.model("users",user)
