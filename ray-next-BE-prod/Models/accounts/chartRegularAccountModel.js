const mongoose = require("mongoose");

const regularAccount = new mongoose.Schema({
  account_name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    // required: true,
  },
  account_code: {
    type: String,
    // required: true,
  },
  parent_account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chart_control_account",
  },
  opening_balance: {
    type: Number,
  },
  current_balance: {
    type: Number,
  },
  opening_balance_type: {
    type: String,
    enum: ["DR", "CR"],
  },
  description: {
    type: String,
  },
  show_in_reports: Boolean,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.regularAccountSchema = mongoose.model(
  "chart_regular_account",
  regularAccount
);
