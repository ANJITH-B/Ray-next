const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
    {
        receipt_id: { type: String, required: true, unique: true },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
        issuing_date: { type: Date, required: true },
        customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customer", required: true },
        received_amount: { type: Number },
        account_type: { type: String, required: true },
        reference_number: { type: String },
        description: { type: String },
        receipt_items: [
            {
                invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: "salesInvoice", required: true },
                settled_amount: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Receipt", receiptSchema);
