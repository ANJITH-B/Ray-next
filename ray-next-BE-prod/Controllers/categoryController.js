const Category = require("../Models/inventory/categoryModel");


exports.createCategory = async (req, res) => {
    console.log('hello',req.body);

  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const sortField = req.query.sort || "createdAt";
    const categories = await Category.find({ isVerify: true })
      .sort({ [sortField]: -1 })
      .populate("products");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products");
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
