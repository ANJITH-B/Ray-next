const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  createInventory,
  getAllInventory,
  inventoryIdGenerator,
  categoryCounter,
} = require("../Controllers/inventoryController");

router.use(authorization);
router.post("/v1/inventory", createInventory);
router.get("/v1/inventory", getAllInventory);
router.get("/v1/inventoryid", inventoryIdGenerator);
router.get("/v1/inventory/category", categoryCounter);

module.exports = router;
