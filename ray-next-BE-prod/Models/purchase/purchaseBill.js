
const mongoose = require("mongoose");

const purchaseBill = new mongoose.Schema({
  purchase_bill_id: {
    type: String,
    required: true,
  },
  issuing_date: {
    type: Date,
    required: true,
  },
  due_date:{
    type: Date,
    // required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "suppliers",
  },
  purchase_details: {
   
    ref_number:String,
    order_type:String,
    po_number: Number,
    source: String,
    GRN: String,
  },
  payment_type: {
    required: true,
    type: String,
    enum: ["DEBIT_CARD","CREDIT_CARD","CREDIT", "CASH","PETTY_CASH"],
  },

  other_details: {
    other_discount_percentage: Number,
    other_discount_amount: Number,
    other_charges: {
      account: String,
      method: String,
      description: String,
      amount: Number
    },
    narration: String,
    ref_settlements: {
      settlements: String,
      new_reference: String
    },
    payment_terms: String,
    balance_amount: Number,
    received_amount:Number
    
  },
  summary: {
    discount_percentage: Number,
    discount_amount: Number,
    round_off: Number,
   
    additional_details: String

  },
  gross_total: Number,
  payment_status:Boolean,
  net_amount:Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.purchaseBillSchema = mongoose.model(
  "purchase_bill",
  purchaseBill
);
