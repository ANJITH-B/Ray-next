const mongoose = require("mongoose");

const invoiceItem = new mongoose.Schema({
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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true
  },
  invoice_id: {
    type: String,
    required: true,
    ref:"salesInvoice"
  }
});

module.exports.salesInvoiceItemsSchema = mongoose.model("invoice_items", invoiceItem);


