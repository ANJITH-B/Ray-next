const express = require("express");
const { getNotifications,createNotification } = require("../Controllers/notificationController");

const router = express.Router();

router.get("/v1/notifications", getNotifications);
router.post("/v1/notifications", createNotification);

module.exports = router;
