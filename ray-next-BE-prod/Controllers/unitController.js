const Unit = require("../Models/inventory/unitModel");


exports.createUnit = async (req, res) => {
  try {
    const unit = new Unit(req.body);
    await unit.save();
    res.status(201).json(unit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getUnits = async (req, res) => {
  try {
    const units = await Unit.find({ isVerify: true }).sort({ createdAt: -1 });
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteUnit = async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
