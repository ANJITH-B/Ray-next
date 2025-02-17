const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        alias: { type: String },
        under: { type: String },
        description: { type: String },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "inventory" }],
        isVerify: { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
