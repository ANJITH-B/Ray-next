const Warehouse = require("../Models/inventory/warehouseModel");


exports.createWarehouse = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const existingWarehouse = await Warehouse.findOne({ warehouseCode: req.body.warehouseCode });
    
    if (existingWarehouse) {
      return res.status(400).json({ message: "Warehouse code already exists. Please use a different code." });
    }
    const warehouse = new Warehouse(req.body);
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getWarehouses = async (req, res) => {
  try {
    const sortField = req.query.sort || "createdAt";
    const warehouses = await Warehouse.find({ isVerify: true }).sort({ [sortField]: -1 });
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Warehouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
