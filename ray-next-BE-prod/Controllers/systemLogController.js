const { logBookSchema } = require("../Models/logBookModel");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");

module.exports.getSystemLogs = async (req, res) => {
  try {
    const logs = await logBookSchema.find().sort({ createdAt: -1 }).limit(50);
    return successResponse(res, 200, "Logs retrieved successfully", { logs });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
