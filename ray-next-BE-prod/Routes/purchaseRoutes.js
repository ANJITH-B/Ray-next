const express = require("express");
const authorization = require("../middlewares/authorization");
const {
  createPurchaseBill,
  createPurchaseReturn,
  createPurchaseLPO,
  createSupplier,
  getAllPurchaseBills,
  getPurchaseBillDetails,
  getAllPurchaseReturn,
  getSinglePurhaseReturnDetails,
  getAllPurchaseOrders,
  getSinglePurchaseOrder,
  getAllSuppliers,
  purchaseIDgenerator,
} = require("../Controllers/purchaseController");
const router = express.Router();
router.use(authorization);

router.post("/v1/purchase/bill", createPurchaseBill);
router.post("/v1/purchase/return", createPurchaseReturn);
router.post("/v1/purchase/order", createPurchaseLPO);
router.post("/v1/purchase/supplier", createSupplier);
router.get("/v1/purchase/bill", getAllPurchaseBills);
router.get(
  "/v1/purchase/bill/:purchase_bill_id",

  getPurchaseBillDetails
);
router.get("/v1/purchase/return", getAllPurchaseReturn);
router.get(
  "/v1/purchase/return/:purchase_return_id",

  getSinglePurhaseReturnDetails
);
router.get("/v1/purchase/order", getAllPurchaseOrders);
router.get(
  "/v1/purchase/order/:purchase_order_id",

  getSinglePurchaseOrder
);
router.get("/v1/purchase/supplier", getAllSuppliers);
router.get("/v1/purchase/id-generator", purchaseIDgenerator);

module.exports = router;
