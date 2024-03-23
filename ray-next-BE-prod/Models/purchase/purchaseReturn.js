
const mongoose = require("mongoose");

const purchase_return = new mongoose.Schema({
  purchase_return_id: {
    type: String,
    required: true,
  },
  issuing_date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "supplier",
  },
  purchase_return_details: {
    payment_type: String,
    bill_number: String,
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
    payment_terms: String

  },
  summary: {
    discount_percentage: Number,
    discount_amount: Number,
    round_off: Number,
    gross_total: Number,
    additional_details: String,
    net_amount:Number,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.purchaseReturnSchema = mongoose.model(
  "purchase_return",
  purchase_return
);
