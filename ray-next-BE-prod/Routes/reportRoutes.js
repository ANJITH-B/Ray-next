const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const { getProfitAndLoss, getBalanceSheet, getCashFlow, getTrialBalance } = require("../Controllers/reportController");

router.use(authorization);
router.get("/v1/profit-loss", getProfitAndLoss)
router.get("/v1/balance-sheet", getBalanceSheet)
router.get("/v1/cash-flow", getCashFlow)
router.get("/v1/trial-balance", getTrialBalance)

module.exports = router;
