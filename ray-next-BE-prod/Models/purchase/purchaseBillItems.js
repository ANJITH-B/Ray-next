const mongoose = require("mongoose");

const purchaseBillItems = new mongoose.Schema({
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
    //ref
  },
  purchase_bill_id: {
    type: String,
    // required: true
    //ref
  }
});

module.exports.PurchaseBillItemsSchema = mongoose.model("purchase_bill_items", purchaseBillItems);


