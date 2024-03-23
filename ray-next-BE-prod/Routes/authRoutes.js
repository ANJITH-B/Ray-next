const express = require("express");
const router = express.Router();

const {
  signup,
  addAgent,
  verifySignup,
  verifySerialNumber,
  getCurrentUser,
  signin,
} = require("../Controllers/authController");
const authorization = require("../middlewares/authorization");

router.post("/v1/user/register", signup);
router.post("/v1/admin/agent", addAgent);
router.post("/v1/user/verify", verifySignup);
router.post("/v1/user/verifysecret", verifySerialNumber);
router.post("/v1/user/login", signin);
router.get("/v1/user", authorization, getCurrentUser);

module.exports = router;
