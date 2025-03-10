const express = require("express");
const {
  createSalesInvoice,
  createSalesReturn,
  createSalesQuotation,
  createSalesOrder,
  createCustomer,
  getAllSalesInvoice,
  getInvoiceDetails,
  getAllSalesReturn,
  getSingleSalesReturnDetails,
  getAllSalesQuotations,
  getSingleSalesQuotation,
  getAllCustomers,
  getAllSalesOrder,
  getSingleSalesOrder,
  salesIDgenerator,
  getCustomerInvoices
} = require("../Controllers/salesController");
const authorization = require("../middlewares/authorization");
const router = express.Router();
router.use(authorization);
router.post("/v1/sales/invoice/", createSalesInvoice);
router.post("/v1/sales/sales-return/", createSalesReturn);
router.post(
  "/v1/sales/quotation/",

  createSalesQuotation
);
router.post("/v1/sales/order/", createSalesOrder);
router.post("/v1/sales/customer", createCustomer);
router.get("/v1/sales/invoice", getAllSalesInvoice);
router.get("/v1/sales/customer-invoices", getCustomerInvoices);
router.get(
  "/v1/sales/invoice/:invoice_id",

  getInvoiceDetails
);
router.get("/v1/sales/sales-return", getAllSalesReturn);
router.get(
  "/v1/sales/sales-return/:sales_return_id",

  getSingleSalesReturnDetails
);
router.get("/v1/sales/quotation", getAllSalesQuotations);
router.get(
  "/v1/sales/quotation/:sales_quotation_id",

  getSingleSalesQuotation
);
router.get("/v1/sales/customer", getAllCustomers);
router.get("/v1/sales/order", getAllSalesOrder);
router.get(
  "/v1/sales/order/:sales_order_id",

  getSingleSalesOrder
);
router.get("/v1/sales/id-generator", salesIDgenerator);

module.exports = router;
