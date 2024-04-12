const mongoose = require("mongoose");

const controlAccount = new mongoose.Schema({
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
  nature_of_account: {
    type: String,
    enum: ["ASSET", "LIABILITY", "EXPENSE", "INCOME","EQUITY"],
  },
  description: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  show_in_reports: Boolean,
});

module.exports.controlAccountSchema = mongoose.model(
  "chart_control_account",
  controlAccount
);
