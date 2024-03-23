const mongoose= require("mongoose");


const customer = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    account_code:{
        type:Number,
        required:true,
    },
    under_group:{
        type:String,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    customer_relation: {
        type: String,
        enum: ['new user', 'existing user'],
        default: 'new user',
    },
    origin:String,
    credit_period:String,
    credit_limit_amount:String,
    credit_limit_days:Number,
    opening_balance:Number,
    debit_or_credit:String,
    sales_man:String,
    contact_details:{
        contact_person:String,
        designation:String,
        contact_number:String,
        email:String,
    },
    office_details:{
        telephone:Number,
        fax:Number,
        email:String,
        address:String
    },
    reference_details:{
        reference_number:Number,
        date:Number,
        due_date:Number,
        description:String,
        amount:Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

 
})

module.exports.customerSchema = mongoose.model("customer",customer)
