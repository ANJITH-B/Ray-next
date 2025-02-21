const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        abbreviation: { type: String },
        decimal_places : { type: String },
        description: { type: String },
        isVerify: { type: Boolean, default: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Unit", unitSchema);
