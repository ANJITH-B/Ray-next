const mongoose = require("mongoose");

const accountGroup = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
  },
  group_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sub_accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chart_regular_accounts",
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

module.exports.accountGroupSchema = mongoose.model(
  "chart_account_group",
  accountGroup
);
