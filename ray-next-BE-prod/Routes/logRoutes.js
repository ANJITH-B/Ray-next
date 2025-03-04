const express = require("express");
const { getSystemLogs } = require("../Controllers/systemLogController");
const router = express.Router();

router.get("/logs", getSystemLogs);

module.exports = router;
