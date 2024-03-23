const mongoose= require("mongoose");


const agent = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    agentID:{
        type:String,
        required :true
    },

})

module.exports.agentSchema = mongoose.model("agents",agent)
