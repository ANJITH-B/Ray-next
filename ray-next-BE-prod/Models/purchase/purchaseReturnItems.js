const mongoose = require("mongoose");

const purchase_return_items = new mongoose.Schema({
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
    required: true
  },
  purchase_return_id: {
    type: String,
    required: true
  }
});

module.exports.purchasereturnItemsSchema = mongoose.model("purchase_return_items", purchase_return_items);


