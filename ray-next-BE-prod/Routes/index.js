const express = require("express") 
const router = express.Router();
const authRoutes = require("./authRoutes")
const salesRoutes = require("./salesRoutes")
const purchaseRoutes = require("./purchaseRoutes")
const inventoryRoutes = require("./inventoryRoutes")
const accountRoutes = require("./accountRoutes")

router.use('/api',authRoutes);
router.use('/api',salesRoutes)
router.use('/api',purchaseRoutes)
router.use('/api',inventoryRoutes)
router.use('/api',accountRoutes)

module.exports = router;