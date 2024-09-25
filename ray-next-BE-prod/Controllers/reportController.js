const {
  controlAccountSchema,
} = require("../Models/accounts/chartControlAccountModel");
const {
  regularAccountSchema,
} = require("../Models/accounts/chartRegularAccountModel");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");

const mongoose = require("mongoose");

module.exports.getProfitAndLoss = async (req, res) => {
  try {
    const user_id = req?.decoded?._id;
    if (!user_id) {
      return errorResponse(res, 400, "Invalid user ID");
    }
    const expenseAccounts = ["Cost of Operation"];
    const incomeAccounts = [
      "Revenue from Operation",
      "equity",
      "Cost of Operation",
    ];
    const expense = await findRegularAccounts(user_id, expenseAccounts);
    const income = await findRegularAccounts(user_id, incomeAccounts);
    const data = [];
    const length =
      expense.length > income.length ? expense.length : income.length;
    for (let i = 0; i < length; i++) {
      data.push({
        expense: expense?.[i]?.account_name,
        exp_amt: expense?.[i]?.current_balance,
        income: income?.[i]?.account_name,
        inc_amt: income?.[i]?.current_balance,
      });
    }

    if (!data.length) {
      return errorResponse(res, 404, "No transactions found");
    }
    return successResponse(res, 200, "Success", data);
  } catch (error) {
    console.error("Error during aggregation:", error);
    errorResponse(res, 500, error.message);
  }
};

module.exports.getBalanceSheet = async (req, res) => {
  try {
    const user_id = req?.decoded?._id;
    if (!user_id) {
      return errorResponse(res, 400, "Invalid user ID");
    }
    const liabilityAccounts = ["Revenue from Operation"];
    const assetsAccounts = ["Cost of Operation"];
    const liability = await findRegularAccounts(user_id, liabilityAccounts);
    const assets = await findRegularAccounts(user_id, assetsAccounts);
    const data = [];
    const length =
      liability.length > assets.length ? liability.length : assets.length;
    for (let i = 0; i < length; i++) {
      data.push({
        liability: liability?.[i]?.account_name,
        lia_amt: liability?.[i]?.current_balance,
        assets: assets?.[i]?.account_name,
        ast_amt: assets?.[i]?.current_balance,
      });
    }

    if (!data.length) {
      return errorResponse(res, 404, "No transactions found");
    }
    return successResponse(res, 200, "Success", data);
  } catch (error) {
    console.error("Error during aggregation:", error);
    errorResponse(res, 500, error.message);
  }
};

module.exports.getTrialBalance = async (req, res) => {
  try {
    const user_id = req?.decoded?._id;
    if (!user_id) {
      return errorResponse(res, 400, "Invalid user ID");
    }
    const data = [];

    if (!data.length) {
      return errorResponse(res, 404, "No transactions found");
    }
    return successResponse(res, 200, "Success", data);
  } catch (error) {
    console.error("Error during aggregation:", error);
    errorResponse(res, 500, error.message);
  }
};

module.exports.getCashFlow = async (req, res) => {
  try {
    const user_id = req?.decoded?._id;
    if (!user_id) {
      return errorResponse(res, 400, "Invalid user ID");
    }
    const data = [];

    if (!data.length) {
      return errorResponse(res, 404, "No transactions found");
    }
    return successResponse(res, 200, "Success", data);
  } catch (error) {
    console.error("Error during aggregation:", error);
    errorResponse(res, 500, error.message);
  }
};

const findRegularAccounts = async (user_id, accountNames) => {
  try {
    const controlAccounts = await controlAccountSchema.find({
      user_id: new mongoose.Types.ObjectId(user_id),
      account_name: { $in: accountNames },
    });
    const controlAccountIds = controlAccounts.map((account) => account._id);

    const regularAccounts = await regularAccountSchema.find({
      parent_account_id: { $in: controlAccountIds },
    });
    return regularAccounts;
  } catch (error) {
    console.error("Error finding regular accounts:", error);
    throw error;
  }
};
