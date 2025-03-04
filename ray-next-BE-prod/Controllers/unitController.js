const Unit = require("../Models/inventory/unitModel");
const createSystemLog = require("../Utils/createSystemLog");



exports.createUnit = async (req, res) => {
  try {
    const unit = new Unit(req.body);
    await unit.save();
    await createSystemLog(req.decoded._id, "CREATE", "INVENTORY", [
      { field: "name", oldValue: null, newValue: unit.name },
      { field: "abbreviation", oldValue: null, newValue: unit.abbreviation },
      { field: "decimal_places", oldValue: null, newValue: unit.decimal_places },
      { field: "description", oldValue: null, newValue: unit.description },
    ]);
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


// exports.updateUnit = async (req, res) => {
//   try {
//     const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!unit) return res.status(404).json({ message: "Unit not found" });
//     res.status(200).json(unit);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// exports.deleteUnit = async (req, res) => {
//   try {
//     await Unit.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Unit deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateUnit = async (req, res) => {
  try {
    const oldUnit = await Unit.findById(req.params.id);
    if (!oldUnit) return res.status(404).json({ message: "Unit not found" });

    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const changes = [];
    Object.keys(req.body).forEach((key) => {
      if (oldUnit[key] !== req.body[key]) {
        changes.push({
          field: key,
          oldValue: oldUnit[key],
          newValue: req.body[key],
        });
      }
    });

    if (changes.length > 0) {
      await createSystemLog(req.decoded._id, "UPDATE", "INVENTORY", changes);
    }

    res.status(200).json(updatedUnit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!unit) return res.status(404).json({ message: "Unit not found" });

    await Unit.findByIdAndDelete(req.params.id);

    await createSystemLog(req.decoded._id, "DELETE", "INVENTORY", [
      { field: "name", oldValue: unit.name, newValue: null },
    ]);

    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};