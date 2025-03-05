const Category = require("../Models/inventory/categoryModel");
const createSystemLog = require("../Utils/createSystemLog");



exports.createCategory = async (req, res) => {

  try {
    const category = new Category(req.body);
    await category.save();
    await createSystemLog(req.decoded._id, "CREATE", "INVENTORY", [
      { field: "name", oldValue: null, newValue: category.name },
      { field: "alias", oldValue: null, newValue: category.alias },
      { field: "description", oldValue: null, newValue: category.description },
    ]);
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


// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!category) return res.status(404).json({ message: "Category not found" });
//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// exports.deleteCategory = async (req, res) => {
//   try {
//     await Category.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.updateCategory = async (req, res) => {
  try {
    const oldCategory = await Category.findById(req.params.id);
    if (!oldCategory) return res.status(404).json({ message: "Category not found" });

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const changes = [];
    Object.keys(req.body).forEach((key) => {
      if (oldCategory[key] !== req.body[key]) {
        changes.push({
          field: key,
          oldValue: oldCategory[key],
          newValue: req.body[key],
        });
      }
    });

    if (changes.length > 0) {
      await createSystemLog(req.decoded._id, "UPDATE", "INVENTORY", changes);
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await Category.findByIdAndDelete(req.params.id);

    await createSystemLog(req.decoded._id, "DELETE", "INVENTORY", [
      { field: "name", oldValue: category.name, newValue: null },
    ]);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};