const mongoose = require("mongoose");

const transaction = new mongoose.Schema({
  journal_id: {
    type: String,
    required: true,
  },
  account_name: {
    type: String,
    // required: true,
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"chart_regular_account"
  },
  credit: {
    type: Number,
    required: true,
  },
  debit: {
    type: Number,
    required: true,
  },
  drcr: {
    type: String,
    enum:["DR","CR"],
    required: true,
  },
  remarks: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

module.exports.journalTransaction = mongoose.model(
  "journal_transaction",
  transaction
);
