const mongoose= require("mongoose");


const accountBookTrans = new mongoose.Schema({
    account_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chart_regular_accounts",
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    description:{
        type:String,
    },
    voucher_type:{
        type:String,
    },
    debit:{
        type:Number,
    },
    credit:{
        type:Number,
    },
    opening_balance:{
        type:Number,
    },
    balance:{
        type:Number,
    },

 
})

module.exports.accountBookTransactionSchema = mongoose.model("account_book_transactions",accountBookTrans)
