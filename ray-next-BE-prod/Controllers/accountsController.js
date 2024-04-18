// add a journal entry

const {
  accountBookTransactionSchema,
} = require("../Models/accounts/accountBookTransaction");
const {
  accountGroupSchema,
} = require("../Models/accounts/chartAccountGroupModel");
const {
  controlAccountSchema,
} = require("../Models/accounts/chartControlAccountModel");
const {
  regularAccountSchema,
} = require("../Models/accounts/chartRegularAccountModel");
const { journalSchema } = require("../Models/accounts/journalModel");
const {
  journalTransaction,
} = require("../Models/accounts/journalTransactionModel");
const { purchaseBillSchema } = require("../Models/purchase/purchaseBill");
const { salesInvoiceSchema } = require("../Models/sales/salesInvoice");
const accountBookTransaction = require("../Utils/accountBookTransaction");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.createJournalEntry = async (req, res) => {
  const {
    journal_id,
    date,
    debit_total,
    credit_total,
    description,
    reference_number,
    transactions,
  } = req.body;

  try {
    const _id = req.decoded._id;

    const newJournalEntry = await journalSchema.create({
      journal_id,
      date,
      debit_total,
      credit_total,
      description,
      reference_number,
      user_id: _id,
    });

    // add transactions

    const modifiedTransactions = await transactions.map((item) => ({
      ...item,
      user_id: _id,
      journal_id,
    }));

    const insertedItems = await journalTransaction.insertMany(
      modifiedTransactions
    );

    // add current balnce and accoynt book transactio in a single for loop of transaction

    const CurrentBalanceUpdater = async (account_id, amount, crdr, account_name, cr, dr) => {
      console.log(account_id, amount, crdr, account_name, cr, dr)
      const selectedRegularAccount = await regularAccountSchema.findOne({ _id: account_id })
      const controlAcc = await controlAccountSchema.findOne({ _id: selectedRegularAccount?.parent_account_id })

      let amountVal = 0
      const curr_bal = selectedRegularAccount.current_balance
      if (controlAcc.nature_of_account === 'ASSET' || controlAcc.nature_of_account === 'EXPENSE') {
        amountVal = crdr == "CR" ? curr_bal - amount : curr_bal + amount
      } else {
        amountVal = crdr == "CR" ? curr_bal + amount : curr_bal - amount
      }

      await regularAccountSchema.updateOne({ _id: account_id }, { current_balance: amountVal })
      await accountBookTransaction(account_id, Date.now(), _id, "", account_name, cr, dr, amountVal)
    }

    transactions.map(item => {
      // add current balance
      let amount = 0
      if (item.drcr == "CR") {
        amount = item.credit
      } else {
        amount = item.debit
      }

      // add account book transaction

      CurrentBalanceUpdater(item.account_id, amount, item.drcr, item.account_name, item.credit, item.debit)
    })



    // await accountBookTransaction(salesAccount_id._id,Date.now(),"","sales account",gross_total,0,gross_total)
    //   await accountBookTransaction(cash_id._id,Date.now(),"","cash account",0,gross_total,0)

    return successResponse(res, 201, "successs");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// based on on invoice and purchase calculate total balance

// journal id

module.exports.journalIdGenerator = async (req, res) => {
  const _id = req?.decoded?._id;
  try {
    const allInventories = await journalSchema.find({ user_id: _id });
    const inventoryNumber = allInventories.length;

    return successResponse(res, 200, "success", {
      product_id: `JV${inventoryNumber}`,
    });
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

module.exports.totalClosingBalance = async (req, res) => {
  // invoice sum - purchase sum
  // invoice : gross_total - purchase_bill: gross_total

  // get invoice sum

  const invoice_sum = await salesInvoiceSchema
    .aggregate([
      {
        $group: {
          _id: "$user_id",
          totalGross: { $sum: "$gross_total" },
        },
      },
    ])
    .exec();
  console.log(invoice_sum);

  const purchaseBill_sum = await purchaseBillSchema
    .aggregate([
      {
        $group: {
          _id: "$user_id",
          totalGross: { $sum: "$gross_total" },
        },
      },
    ])
    .exec();
  console.log(purchaseBill_sum);
  // what if purchase bill sum is gretater than invoice sum?
  const total_closing_balance = invoice_sum - purchaseBill_sum;
};

// chart of accounts

// account groups

module.exports.createAccountGroups = async (req, res) => {
  const _id = req.decoded._id;
  const { group_id, group_name, group_description, sub_accounts } = req.body;

  try {
    const newAccountGroup = await accountGroupSchema.create({
      group_id,
      group_name,
      group_description,
      user_id: _id,
      sub_accounts,
    });

    return successResponse(res, 201, "successs");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//create control account

module.exports.createControlAccount = async (req, res) => {
  const {
    account_name,
    alias,
    account_code,
    description,
    show_in_reports,
    nature_of_account,
  } = req.body;
  try {
    const _id = req.decoded._id;
    const newControlAccount = await controlAccountSchema.create({
      account_name,
      alias,
      account_code,
      nature_of_account,
      description,
      show_in_reports,
      user_id: _id,
    });
    return successResponse(res, 201, "successs");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// create regular account

module.exports.createRegularAccounts = async (req, res) => {
  const {
    account_name,
    alias,
    account_code,
    description,
    show_in_reports,
    parent_account_id,
    opening_balance,
    opening_balance_type,
    reference
  } = req.body;
  const _id = req.decoded._id;
  try {
    const newRegularAccount = await regularAccountSchema.create({
      account_name,
      alias,
      account_code,
      description,
      show_in_reports,
      user_id: _id,
      parent_account_id,
      opening_balance,
      current_balance: opening_balance,
      opening_balance_type,
      reference
    });
    console.log(newRegularAccount);
    return successResponse(res, 201, "successs");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//get all regular accounts - pagination,filter
module.exports.getAllRegularAccounts = async (req, res) => {
  const _id = req.decoded._id;
  const search = req.query.search;
  const perPageItems = req.query.perpageitems
    ? parseInt(req.query.perpageitems)
    : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  try {
    const skipCount = (page - 1) * perPageItems;
    // things needed additionally - just current balance

    // go to journal transaction and search with journal id and from results select dr total and credit total , to opening balace + credit and - debit
    // after that for each account add give this balace aong with them
    // calculation for current account
    // check how much total debit and credit happened for this regular account in journal


    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
        },
      },

      {
        $lookup: {
          from: "chart_control_accounts",
          localField: "parent_account_id",
          foreignField: "_id",
          as: "parent_accounts",
        },
      },
      {
        $match: {
          $or: [
            {
              "account_name": {
                $regex: new RegExp(search, "i"), // Case-insensitive search
              },
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort in descending order based on the createdAt field
        },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: perPageItems,
      },
    ];
    // Execute the aggregation pipeline
    let allRegularAccounts = await regularAccountSchema.aggregate(pipeline).exec();

    return successResponse(res, 201, "successs", allRegularAccounts);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//get all control accounts - pagination,filter

module.exports.getAllControlAccounts = async (req, res) => {
  const _id = req.decoded._id;
  try {
    // const pipeline = [
    //   {
    //     $match: {
    //       user_id: new ObjectId(_id),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "chart_regular_accounts",
    //       localField: "_id",
    //       foreignField: "parent_account_id",
    //       as: "child_accounts",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$child_accounts",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "journal_transactions",
    //       localField: "child_accounts._id",
    //       foreignField: "account_id",
    //       as: "transactions",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$transactions",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         _id: "$_id",
    //         account_name: "$account_name",
    //         alias: "$alias",
    //         account_code: "$account_code",
    //         nature_of_account: "$nature_of_account",
    //         description: "$description",
    //         user_id: "$user_id",
    //         show_in_reports: "$show_in_reports",
    //       },
    //       current_balance: {
    //         $sum: {
    //           $subtract: [
    //             { $ifNull: ["$transactions.debit", 0] },
    //             { $ifNull: ["$transactions.credit", 0] },
    //           ],
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: "$_id._id",
    //       account_name: "$_id.account_name",
    //       alias: "$_id.alias",
    //       account_code: "$_id.account_code",
    //       nature_of_account: "$_id.nature_of_account",
    //       description: "$_id.description",
    //       user_id: "$_id.user_id",
    //       show_in_reports: "$_id.show_in_reports",
    //       current_balance: 1,
    //     },
    //   },
    // ];




    const pipeline = [
      // Match control accounts by user_id
      {
        $match: {
          user_id: new ObjectId(_id),
        },
      },
      // Lookup regular accounts using parent_account_id
      {
        $lookup: {
          from: "chart_regular_accounts",
          localField: "_id",
          foreignField: "parent_account_id",
          as: "regular_accounts",
        },
      },
      // Unwind regular_accounts array
      {
        $unwind: {
          path: "$regular_accounts",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Group by control account fields and sum regular account balances
      {
        $group: {
          _id: "$_id",
          account_name: { $first: "$account_name" },
          alias: { $first: "$alias" },
          account_code: { $first: "$account_code" },
          nature_of_account: { $first: "$nature_of_account" },
          description: { $first: "$description" },
          user_id: { $first: "$user_id" },
          show_in_reports: { $first: "$show_in_reports" },
          total_opening_balance: { $sum: "$regular_accounts.opening_balance" },
          total_current_balance: { $sum: "$regular_accounts.current_balance" },
          regular_accounts: {
            $push: {
              _id: "$regular_accounts._id",
              account_name: "$regular_accounts.account_name",
              opening_balance: "$regular_accounts.opening_balance",
              current_balance: "$regular_accounts.current_balance",
            },
          },
        },
      },
      // Sort by createdAt in descending order
      { $sort: { createdAt: -1 } },
      // Pagination: Limit and Skip based on page number and page size
      { $limit: 10 }, // Adjust the limit based on your pagination requirements
      { $skip: 0 }, // Adjust the skip based on your pagination requirements
    ];

    const allControlAccounts = await controlAccountSchema
      .aggregate(pipeline)
      .exec();

    // console.log(allControlAccounts)
    return successResponse(res, 201, "successs", allControlAccounts);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//get all account groups - pagination,filter

module.exports.getAllAccountGroups = async (req, res) => {
  const _id = req.decoded._id;

  try {
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "chart_regular_accounts", // Assuming this is the correct collection name
          localField: "sub_accounts",
          foreignField: "_id",
          as: "sub_accounts_data",
        },
      },
      {
        $project: {
          _id: 1,
          group_name: 1,
          description: 1,
          sub_accounts_names: "$sub_accounts_data.account_name",
        },
      },
    ];

    // const allAccountGroups = await accountGroupSchema.find({user_id:_id}).populate()
    const allAccountGroups = await accountGroupSchema
      .aggregate(pipeline)
      .exec();
    console.log(allAccountGroups);

    return successResponse(res, 201, "successs", allAccountGroups);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//account books

module.exports.getAccountBooks = async (req, res) => {
  const _id = req.decoded._id;
  const accountId = req.query.account;

  try {
    const allTransactions = await accountBookTransactionSchema.find({
      user_id: _id,
      account_id: accountId,
    });
    return successResponse(res, 201, "successs", allTransactions);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// search inventory product name & id
