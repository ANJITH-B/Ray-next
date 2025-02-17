const StockSummary = require("../Models/inventory/stockSummaryModel");


exports.createStockSummary = async (req, res) => {
  try {
    const stock = new StockSummary(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStockSummaries = async (req, res) => {
  try {
    const sortField = req.query.sort || "createdAt";
    const stocks = await StockSummary.find({ isVerify: true }).sort({ [sortField]: -1 });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStockSummaryById = async (req, res) => {
  try {
    const stock = await StockSummary.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock record not found" });
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStockSummary = async (req, res) => {
  try {
    const stock = await StockSummary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stock) return res.status(404).json({ message: "Stock record not found" });
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStockSummary = async (req, res) => {
  try {
    await StockSummary.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Stock record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
