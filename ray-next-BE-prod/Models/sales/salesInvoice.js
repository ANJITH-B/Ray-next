const mongoose = require("mongoose");

const salesInvoice = new mongoose.Schema({
  invoice_id: {
    type: String,
    required: true,
  },
  issuing_date: {
    type: Date,
    required: true,
  },
  due_date: {
    type: Date,
    // required: true,
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

  payment_type: {
    required: true,
    type: String,
    enum: ["DEBIT_CARD","CREDIT_CARD","CREDIT", "CASH","PETTY_CASH"],
  },
  po_number: Number,
  source: String,
  delivery_notes: String,

  other_details: {
    other_discount_percentage: Number,
    other_discount_amount: Number,
    other_charges: {
      account: String,
      method: String,
      description: String,
      amount: Number,
    },
    narration: String,
    ref_settlements: {
      settlements: String,
      new_reference: String,
    },
    payment_terms: String,
  },
  discount_percentage: Number,
  discount_amount: Number,
  round_off: Number,
  gross_total: Number,
  net_amount: Number,
  additional_details: String,
  received_amount: Number,
  balance_amount: Number,
  payment_status: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.salesInvoiceSchema = mongoose.model(
  "salesInvoice",
  salesInvoice
);
