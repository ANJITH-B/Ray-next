const { logBookSchema } = require("../Models/logBookModel");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");

module.exports.getSystemLogs = async (req, res) => {
  const _id = req.decoded._id;
  const period = req.query.period;
  const [startDate, endDate] = period
    .split(",")
    .map((dateString) => new Date(dateString));
  
  try {
    const logs = await logBookSchema
    .find({
      user_id: _id,
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .populate("user_id", "name _id").sort({ createdAt: -1 });;
    console.log('logs',logs);
    return successResponse(res, 200, "Logs retrieved successfully", logs);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
