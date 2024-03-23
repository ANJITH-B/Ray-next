const mongoose = require("mongoose");

const journal = new mongoose.Schema({
  journal_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  debit_total: {
    type: String,
  },
  credit_total: {
    type: String,
  },
  description:String,
  reference_number: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

module.exports.journalSchema = mongoose.model("journal", journal);
