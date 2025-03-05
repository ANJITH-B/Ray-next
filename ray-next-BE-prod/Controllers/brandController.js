const Brand = require("../Models/inventory/brandModel");
const createSystemLog = require("../Utils/createSystemLog");



exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    await createSystemLog(req.decoded._id, "CREATE", "INVENTORY", [
      { field: "name", oldValue: null, newValue: brand.name },
      { field: "alias", oldValue: null, newValue: brand.alias },
      { field: "description", oldValue: null, newValue: brand.description },
    ]);
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getBrands = async (req, res) => {
  try {
    const sortField = req.query.sort || "createdAt";
    const brands = await Brand.find({ isVerify: true })
      .sort({ [sortField]: -1 })
      .populate("products");
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate("products");
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.updateBrand = async (req, res) => {
//   try {
//     const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!brand) return res.status(404).json({ message: "Brand not found" });
//     res.status(200).json(brand);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateBrand = async (req, res) => {
  try {
    const oldBrand = await Brand.findById(req.params.id);
    if (!oldBrand) return res.status(404).json({ message: "Brand not found" });

    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });


    const changes = [];
    Object.keys(req.body).forEach((key) => {
      if (oldBrand[key] !== req.body[key]) {
        changes.push({
          field: key,
          oldValue: oldBrand[key],
          newValue: req.body[key],
        });
      }
    });

    if (changes.length > 0) {
      await createSystemLog(req.decoded._id, "UPDATE", "INVENTORY", changes);
    }

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.deleteBrand = async (req, res) => {
//   try {
//     await Brand.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Brand deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });

    await Brand.findByIdAndDelete(req.params.id);

    await createSystemLog(req.decoded._id, "DELETE", "INVENTORY", [
      { field: "name", oldValue: brand.name, newValue: null },
    ]);

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
