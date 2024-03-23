const mongoose = require("mongoose");

const sales_return_item = new mongoose.Schema({
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
  sales_return_id: {
    type: String,
    required: true,
    ref:"sales_return"
  }
});

module.exports.salesreturnItemsSchema = mongoose.model("sales_return_item", sales_return_item);


