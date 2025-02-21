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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  barcode: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand"
  },
  valuation: {
    type: String
  },
  image_url: {
    type: String
  },
  excludefromstock: {
    type: Boolean
  },
  active: {
    type: Boolean
  },
  stock: {
    type: Number
  },
  stock_unit: {
    type: String
  },
  minimum_quantity: {
    type: Number
  },
  unit_details: [{
    unit: {
      type: String
    },
    base_unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "units"
    },
    n_unit: {
      type: String
    },
    n_base_unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "units"
    },
    // n_base: {
    //   type: String
    // },
    // bar_code: {
    //   type: String
    // },
    // opening_quantity: {
    //   type: String
    // },
    // rate: {
    //   type: String
    // },
    // balance: {
    //   type: String
    // },
    // sale_rate: {
    //   type: String
    // },
  }],
});

module.exports.inventorySchema = mongoose.model("inventory", inventory);
