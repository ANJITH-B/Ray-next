const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const {
  createInventory,
  getAllInventory,
  inventoryIdGenerator,
  categoryCounter,
} = require("../Controllers/inventoryController");
const unitController = require("../Controllers/unitController");
const categoryController = require("../Controllers/categoryController");
const brandController = require("../Controllers/brandController");
const warehouseController = require("../Controllers/warehouseController");
const stockSummaryController = require("../Controllers/stockSummaryController");


router.use(authorization);
router.post("/v1/inventory", createInventory);
router.get("/v1/inventory", getAllInventory);
router.get("/v1/inventoryid", inventoryIdGenerator);
router.get("/v1/inventory/category", categoryCounter);

router.post("/v1/inventory/unit", unitController.createUnit);
router.get("/v1/inventory/unit", unitController.getUnits);
router.get("/v1/inventory/unit/:id", unitController.getUnitById);
router.put("/v1/inventory/unit/:id", unitController.updateUnit);
router.delete("/v1/inventory/unit/:id", unitController.deleteUnit);

router.post("/v1/inventory/categories", categoryController.createCategory);
router.get("/v1/inventory/categories", categoryController.getCategories);
router.get("/v1/inventory/categories/:id", categoryController.getCategoryById);
router.put("/v1/inventory/categories/:id", categoryController.updateCategory);
router.delete("/v1/inventory/categories/:id", categoryController.deleteCategory);

router.post("/v1/inventory/brands", brandController.createBrand);
router.get("/v1/inventory/brands", brandController.getBrands);
router.get("/v1/inventory/brands/:id", brandController.getBrandById);
router.put("/v1/inventory/brands/:id", brandController.updateBrand);
router.delete("/v1/inventory/brands/:id", brandController.deleteBrand);

router.post("/v1/inventory/warehouses", warehouseController.createWarehouse);
router.get("/v1/inventory/warehouses", warehouseController.getWarehouses);
router.get("/v1/inventory/warehouses/:id", warehouseController.getWarehouseById);
router.put("/v1/inventory/warehouses/:id", warehouseController.updateWarehouse);
router.delete("/v1/inventory/warehouses/:id", warehouseController.deleteWarehouse);

router.post("/v1/inventory/stock-summaries", stockSummaryController.createStockSummary);
router.get("/v1/inventory/stock-summaries", stockSummaryController.getStockSummaries);
router.get("/v1/inventory/stock-summaries/:id", stockSummaryController.getStockSummaryById);
router.put("/v1/inventory/stock-summaries/:id", stockSummaryController.updateStockSummary);
router.delete("/v1/inventory/stock-summaries/:id", stockSummaryController.deleteStockSummary);

module.exports = router;
