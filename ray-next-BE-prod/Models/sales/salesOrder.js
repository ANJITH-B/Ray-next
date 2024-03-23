
const mongoose = require("mongoose");

const salesOrder = new mongoose.Schema({
  sales_order_id: {
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
    // required: true,
    ref: "customer",
  },
  sale_order_details: {
    payment_type: String,
    p_o_number:String,
    s_o_number:String,
    source: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
    net_amount:Number

  },
  sales_order_items:[{
    item_code: String,
    description: String,
    remarks: String,
    units: String,
    quantity: Number,
    rate: Number,
    gross_amount: Number,
    discount_percentage: Number,
    discount_amount: Number,
    net_amount: Number,
  }]
});

module.exports.salesOrderSchema = mongoose.model(
  "sales_order",
  salesOrder
);
