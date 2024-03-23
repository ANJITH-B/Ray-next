
const mongoose = require("mongoose");

const sales_return = new mongoose.Schema({
  sales_return_id: {
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
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customer",
  },
  sales_return_details: {
    payment_type: String,
    ref_number: String,
    invoice_id: String,
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
    net_amount: Number

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.salesReturnSchema = mongoose.model(
  "sales_return",
  sales_return
);
