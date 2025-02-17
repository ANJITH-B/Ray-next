const Brand = require("../Models/inventory/brandModel");


exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
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


exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
