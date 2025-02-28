// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ["add", "update"],
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Notification", notificationSchema);


const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, enum: ["info", "success", "warning", "error"], default: "info" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);