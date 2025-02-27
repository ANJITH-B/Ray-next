const mongoose = require("mongoose");

const logBook = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    module_type: {
      type: String,
      enum: ["AUTH", "ACCOUNTS", "SALES", "PURCHASE", "INVENTORY"],
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.logBookSchema = mongoose.model("log_book_schema", logBook);
