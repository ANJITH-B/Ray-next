const mongoose = require("mongoose");

const inventory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  item_code: {
    type: String,
    required: true,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"users"
  },
  barcode: {
    type: String,
  },
  category:{
    required: true,
    type: String,
    enum:["electronics","appliances","footwear","accessories"]
  },
  brand:{
    type: String
  },
  default_supplier:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  country_of_origin:{
    type: String
  },
  purchase_rate:{
    type: String
  },
  margin_percent:{
    type: String
  },
  description:{
    type: String
  },
  image_url:{
    type: String
  },
  excludefromstock:{
    type: Boolean
  },
  active:{
    type: Boolean
  },
  unit_details: {
    unit:{
        type: String
      },
    base_unit:{
        type: String
      },
    n_unit:{
        type: String
      },
    n_base:{
        type: String
      },
    bar_code:{
        type: String
      },
    opening_quantity:{
        type: String
      },
    rate:{
        type: String
      },
    balance:{
        type: String
      },
    sale_rate:{
        type: String
      },
  },
});

module.exports.inventorySchema = mongoose.model("inventory", inventory);
