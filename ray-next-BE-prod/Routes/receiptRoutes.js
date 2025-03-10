const express = require("express");
const {
  createReceipt,
} = require("../Controllers/receiptController");

const router = express.Router();

router.post("/v1/receipts/add", createReceipt);

module.exports = router;
