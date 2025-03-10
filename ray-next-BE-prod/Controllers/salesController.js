var jwt = require("jsonwebtoken");
const errorResponse = require("../Utils/errorResponse");
const { salesInvoiceSchema } = require("../Models/sales/salesInvoice");
const successResponse = require("../Utils/successResponse");
const {
  salesInvoiceItemsSchema,
} = require("../Models/sales/salesInvoiceItems");
const { salesReturnSchema } = require("../Models/sales/salesReturn");
const { salesreturnItemsSchema } = require("../Models/sales/salesReturnItems");
const { salesQuotationSchema } = require("../Models/sales/salesQuot");
const { salesOrderSchema } = require("../Models/sales/salesOrder");
const { customerSchema } = require("../Models/sales/salesCustomer");
const Receipt = require("../Models/receipt/voucherReceipt");

const { DateAdderFunction } = require("../Utils/helperFunctions");
const mongoose = require("mongoose");
const { journalSchema } = require("../Models/accounts/journalModel");
const {
  journalTransaction,
} = require("../Models/accounts/journalTransactionModel");
const {
  regularAccountSchema,
} = require("../Models/accounts/chartRegularAccountModel");
const accountBookTransaction = require("../Utils/accountBookTransaction");
const createSystemLog = require("../Utils/createSystemLog");

const ObjectId = mongoose.Types.ObjectId;
// # invoice

// create an invoice

module.exports.createSalesInvoice = async (req, res) => {
  const {
    invoice_id,
    issuing_date,
    other_details,
    discount_percentage,
    discount_amount,
    round_off,
    gross_total,
    payment_type,
    po_number,
    source,
    delivery_notes,
    additional_details,
    sales_invoice_items,
    customer_id,
    net_amount,
  } = req.body;

  try {
    //get user id from token
    const _id = req.decoded._id;

    // check payment mode ; payment type should be enum
    if (payment_type == "CREDIT") {
      //if credit
      //check if credit limit dont exceed invoice net amount

      const customerDetails = await customerSchema.findById(customer_id);
      if (parseFloat(gross_total) > parseFloat(customerDetails.credit_limit_amount)) {
        return errorResponse(res, 401, "credit limit exceeded");
      }

      //if all ok then reduce netamount from customer credit

      const newCustomerCreditBalance =
        customerDetails.credit_limit_amount - gross_total;

      await customerSchema.updateOne(
        { _id: customer_id },
        { credit_limit_amount: newCustomerCreditBalance }
      );

      // assign due date
      const credit_limit_days = customerDetails.credit_limit_days;

      const due_date = DateAdderFunction(issuing_date, credit_limit_days);

      // update received and balanec amount

      const balance_amount = gross_total;

      const received_amount = 0;

      //save invoice

      const newInvoice = await salesInvoiceSchema.create({
        invoice_id,
        issuing_date,
        due_date,
        user_id: _id,
        customer_id,
        other_details,
        discount_percentage,
        discount_amount,
        round_off,
        gross_total,
        payment_type,
        po_number,
        source,
        delivery_notes,
        additional_details,
        received_amount,
        balance_amount,
        net_amount,
        payment_status: false,
      });


      const modifiedItems = await sales_invoice_items.map((item) => ({
        ...item,
        user_id: _id,
        invoice_id,
      }));

      const insertedItems = await salesInvoiceItemsSchema.insertMany(
        modifiedItems
      );
      // console.log("Items added successfully:", insertedItems);

      // console.log(newInvoice + "jjjjjjjj")
      const logFields = Object.keys(req.body).map((field) => ({
        field,
        oldValue: null,
        newValue: req.body[field],
      }));
  
      await createSystemLog(req.decoded._id, "CREATE", "SALES", logFields);

      return successResponse(res, 201, "invoice created succesfully");
    } else {
      const newInvoice = await salesInvoiceSchema.create({
        invoice_id,
        issuing_date,
        due_date: null,
        user_id: _id,
        customer_id,
        other_details,
        discount_percentage,
        discount_amount,
        round_off,
        gross_total,
        payment_type,
        po_number,
        source,
        delivery_notes,
        additional_details,
        received_amount: gross_total,
        balance_amount: 0,
        net_amount,
        payment_status: true,
      });

      const modifiedItems = await sales_invoice_items.map((item) => ({
        ...item,
        user_id: _id,
        invoice_id,
      }));

      const insertedItems = await salesInvoiceItemsSchema.insertMany(
        modifiedItems
      );

      const CurrentBalanceUpdater = async (
        account_id,
        amount,
        crdr,
        account_name,
        cr,
        dr
      ) => {
        console.log(account_id, amount, crdr, account_name, cr, dr);
        const selectedRegularAccount = await regularAccountSchema.findOne({
          _id: account_id,
        });
        let amountVal = 0;
        if (crdr == "CR") {
          amountVal = selectedRegularAccount.current_balance - amount;
        } else {
          amountVal = selectedRegularAccount.current_balance + amount;
        }

        await regularAccountSchema.updateOne(
          { _id: account_id },
          { current_balance: amountVal }
        );
        await accountBookTransaction(
          account_id,
          Date.now(),
          _id,
          "",
          account_name,
          cr,
          dr,
          amountVal
        );
      };

      const salesAccount = await regularAccountSchema.findOne({
        user_id: _id,
        account_name: "Sales account",
      });
      const cashAccount = await regularAccountSchema.findOne({
        user_id: _id,
        account_name: "Customer cash",
      });
      // sales account
      CurrentBalanceUpdater(
        salesAccount._id,
        gross_total,
        "DR",
        "Sales account",
        0,
        gross_total
      );

      // cash account
      CurrentBalanceUpdater(
        cashAccount._id,
        gross_total,
        "CR",
        "Customer cash account",
        gross_total,
        0
      );

      const logFields = Object.keys(req.body).map((field) => ({
        field,
        oldValue: null,
        newValue: req.body[field],
      }));

      await createSystemLog(req.decoded._id, "CREATE", "SALES", logFields);

      return successResponse(res, 201, "invoice created succesfully");
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// create a sales return

module.exports.createSalesReturn = async (req, res) => {
  const {
    sales_return_id,
    issuing_date,
    customer_id,
    sales_return_details,
    other_details,
    summary,
    sales_return_items,
  } = req.body;

  try {
    const _id = req.decoded._id;
    const newSalesReturn = await salesReturnSchema.create({
      sales_return_id,
      issuing_date,
      customer_id,
      user_id: _id,
      sales_return_details,
      other_details,
      summary,
    });

    // add sales return items

    const modifiedItems = await sales_return_items.map((item) => ({
      ...item,
      user_id: _id,
      sales_return_id,
    }));

    const insertedItems = await salesreturnItemsSchema.insertMany(
      modifiedItems
    );

    return successResponse(res, 201, "sales return created succesfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// create sales quoation

module.exports.createSalesQuotation = async (req, res) => {
  const {
    sales_quotation_id,
    issuing_date,
    customer_id,
    sale_quotation_details,
    other_details,
    summary,
    sales_quotation_items,
  } = req.body;

  try {
    const _id = req.decoded._id;
    const newSalesQuotation = await salesQuotationSchema.create({
      sales_quotation_id,
      issuing_date,
      user_id: _id,
      customer_id,
      sale_quotation_details,
      other_details,
      summary,
      sales_quotation_items,
    });

    return successResponse(res, 201, "sales quotation created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// create sales order

module.exports.createSalesOrder = async (req, res) => {
  const {
    sales_order_id,
    issuing_date,
    customer_id,
    sale_order_details,
    other_details,
    summary,
    sales_order_items,
  } = req.body;

  try {
    const _id = req.decoded._id;
    const newSalesOrder = await salesOrderSchema.create({
      sales_order_id,
      issuing_date,
      user_id: _id,
      customer_id,
      sale_order_details,
      other_details,
      summary,
      sales_order_items,
    });

    return successResponse(res, 201, "sales order created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// create customer

module.exports.createCustomer = async (req, res) => {
  const _id = req.decoded._id;
  const {
    name,
    account_code,
    under_group,
    origin,
    credit_period,
    credit_limit_amount,
    credit_limit_days,
    opening_balance,
    debit_or_credit,
    sales_man,
    contact_details,
    office_details,
    reference_details,
  } = req.body;

  try {
    const newCustomer = await customerSchema.create({
      name,
      account_code,
      under_group,
      origin,
      credit_period,
      credit_limit_amount,
      credit_limit_days,
      opening_balance,
      debit_or_credit,
      sales_man,
      contact_details,
      office_details,
      reference_details,
      user_id: _id,
    });

    const logFields = Object.keys(req.body).map((field) => ({
      field,
      oldValue: null,
      newValue: req.body[field],
    }));

    await createSystemLog(req.decoded._id, "CREATE", "SALES", logFields);

    return successResponse(res, 201, "scustomer added successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get all invoice with pagination , sort by date , search by customer name

module.exports.getAllSalesInvoice = async (req, res) => {
  const { search } = req.query;
  const _id = req.decoded._id;
  const perPageItems = req.query.perpageitems
    ? parseInt(req.query.perpageitems)
    : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  try {
    const skipCount = (page - 1) * perPageItems;

    // Create an aggregation pipeline to search for customer names
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "customers", // Replace with the actual name of your customer collection
          localField: "customer_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "customerInfo",
        },
      },
      {
        $match: {
          $or: [
            {
              "customerInfo.name": {
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
    let allInvoices = await salesInvoiceSchema.aggregate(pipeline).exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: allInvoices,
    };

    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


exports.getCustomerInvoices = async (req, res) => {
  try {
    const { customerId } = req.query;
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" }); 
    }

    const invoices = await salesInvoiceSchema.find({ customer_id: customerId,payment_type: "CREDIT"  }).sort({createdAt: -1});
    // console.log('invoices',invoices);

    res.status(200).json({ data: invoices });
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};
// get single invoice

module.exports.getInvoiceDetails = async (req, res) => {
  const _id = req.decoded._id;
  const invoice_id = req.params.invoice_id;
  try {
    const pipeline = [
      {
        $match: {
          $and: [{ user_id: new ObjectId(_id) }, { invoice_id: invoice_id }],
        },
      },
      {
        $lookup: {
          from: "invoice_items", // Replace with the actual name of your customer collection
          localField: "invoice_id",
          foreignField: "invoice_id", // Assuming customer documents have an _id field
          as: "invoice_items_data",
        },
      },
      {
        $lookup: {
          from: "customers", // Replace with the actual name of your customer collection
          localField: "customer_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "customer_details",
        },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual name of your customer collection
          localField: "user_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "user_details",
        },
      },
    ];

    const invoice_details = await salesInvoiceSchema.aggregate(pipeline).exec();
    if (!invoice_details.length) {
      return errorResponse(res, 404, "Invoice doesn't exist");
    }

    return successResponse(res, 200, "success", invoice_details);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get all sales return

module.exports.getAllSalesReturn = async (req, res) => {
  const { search } = req.query;
  const _id = req.decoded._id;
  const perPageItems = req.query.perpageitems
    ? parseInt(req.query.perpageitems)
    : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  try {
    const skipCount = (page - 1) * perPageItems;

    // Create an aggregation pipeline to search for customer names
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "customers", // Replace with the actual name of your customer collection
          localField: "customer_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "customerInfo",
        },
      },
      {
        $unwind: {
          path: "$customerInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              "customerInfo.name": {
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
    const all_sales_return_items = await salesReturnSchema
      .aggregate(pipeline)
      .exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: all_sales_return_items,
    };

    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get single sales return

module.exports.getSingleSalesReturnDetails = async (req, res) => {
  const _id = req.decoded._id;
  const sales_return_id = req.params.sales_return_id;
  try {
    const pipeline = [
      {
        $match: {
          $and: [
            { user_id: new ObjectId(_id) },
            { sales_return_id: sales_return_id },
          ],
        },
      },
      {
        $lookup: {
          from: "sales_return_items", // Replace with the actual name of your customer collection
          localField: "sales_return_id",
          foreignField: "sales_return_id", // Assuming customer documents have an _id field
          as: "sales_return_items",
        },
      },
      {
        $lookup: {
          from: "customers", // Replace with the actual name of your customer collection
          localField: "customer_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "customer_details",
        },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual name of your customer collection
          localField: "user_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "user_details",
        },
      },
    ];

    const sales_return_items = await salesReturnSchema
      .aggregate(pipeline)
      .exec();
    if (!sales_return_items.length) {
      return errorResponse(res, 404, "sales return doesn't exist");
    }

    return successResponse(res, 200, "success", sales_return_items);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get all sales quotations

module.exports.getAllSalesQuotations = async (req, res) => {
  const { search } = req.query;
  const _id = req.decoded._id;
  const perPageItems = req.query.perpageitems
    ? parseInt(req.query.perpageitems)
    : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  try {
    const skipCount = (page - 1) * perPageItems;

    // Create an aggregation pipeline to search for customer names
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "customers", // Replace with the actual name of your customer collection
          localField: "customer_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "customerInfo",
        },
      },
      {
        $unwind: {
          path: "$customerInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              "customerInfo.name": {
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
    const all_sales_quotation_items = await salesQuotationSchema
      .aggregate(pipeline)
      .exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: all_sales_quotation_items,
    };

    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get single sales quotations

module.exports.getSingleSalesQuotation = async (req, res) => {
  const _id = req.decoded._id;
  const sales_quotation_id = req.params.sales_quotation_id;
  try {
    const sales_quotation_details = await salesQuotationSchema
      .findOne({
        sales_quotation_id,
        user_id: _id,
      })
      .populate("customer_id")
      .populate("user_id");

    if (!sales_quotation_details) {
      return errorResponse(res, 404, "sales quotation not available");
    }

    return successResponse(res, 200, "success", sales_quotation_details);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//get all customers result

module.exports.getAllCustomers = async (req, res) => {
  const _id = req.decoded._id;
  const page = parseInt(req.query.page) || 1;
  const perPageItems = parseInt(req.query.perPageItems) || 10;
  const searchQuery = req.query.search || "";
  try {
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
          $or: [
            { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search on customerName
            // Add more fields to search if needed
          ],
        },
      },
      {
        $facet: {
          customers: [
            { $skip: (page - 1) * perPageItems },
            { $limit: perPageItems },
          ],
        },
      },
    ];

    const result = await customerSchema.aggregate(pipeline);

    if (result.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    const customers = result[0].customers;

    const final_result = {
      page,
      perPageItems,

      data: customers,
    };

    return successResponse(res, 200, "success", final_result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//get all sales order

module.exports.getAllSalesOrder = async (req, res) => {
  const { search } = req.query;
  const _id = req.decoded._id;
  const perPageItems = req.query.perpageitems
    ? parseInt(req.query.perpageitems)
    : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  try {
    const skipCount = (page - 1) * perPageItems;

    // Create an aggregation pipeline to search for customer names
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "customers", // Replace with the actual name of your customer collection
          localField: "customer_id",
          foreignField: "_id", // Assuming customer documents have an _id field
          as: "customerInfo",
        },
      },
      {
        $unwind: {
          path: "$customerInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              "customerInfo.name": {
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
    const all_sales_orders = await salesOrderSchema.aggregate(pipeline).exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: all_sales_orders,
    };

    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get single sales order
module.exports.getSingleSalesOrder = async (req, res) => {
  const _id = req.decoded._id;
  const sales_order_id = req.params.sales_order_id;
  try {
    const sales_order_details = await salesOrderSchema
      .findOne({
        sales_order_id,
        user_id: _id,
      })
      .populate("customer_id")
      .populate("user_id");

    if (!sales_order_details) {
      return errorResponse(res, 404, "sales order doesnt exist");
    }

    return successResponse(res, 200, "success", sales_order_details);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// total invoice report

//sales id generator
module.exports.salesIDgenerator = async (req, res) => {
  const _id = req?.decoded?._id;
  const moduleName = req.query.module;
  try {
    if (!_id) {
      errorResponse(res, 401, "invalid token");
    }
    if (moduleName == "invoice") {
      const allInvoices = await salesInvoiceSchema.find({ user_id: _id });
      const invoiceNumber = allInvoices.length + 1;

      return successResponse(res, 200, "success", {
        invoice_id: `INV${invoiceNumber}`,
      });
    } else if (moduleName == "receipts") {
      const allReturns = await Receipt.find({ user_id: _id });
      const returnnumber = allReturns.length + 1;

      return successResponse(res, 200, "success", {
        receipt_id: `REC${returnnumber}`,
      });
    }else if (moduleName == "return") {
      const allReturns = await salesReturnSchema.find({ user_id: _id });
      const returnnumber = allReturns.length + 1;

      return successResponse(res, 200, "success", {
        return_id: `RET${returnnumber}`,
      });
    }
     else if (moduleName == "quotation") {
      const allInvoices = await salesQuotationSchema.find({ user_id: _id });
      const invoiceNumber = allInvoices.length + 1;

      return successResponse(res, 200, "success", {
        quot_id: `QUO${invoiceNumber}`,
      });
    } else if (moduleName == "order") {
      const allInvoices = await salesOrderSchema.find({ user_id: _id });
      const invoiceNumber = allInvoices.length + 1;

      return successResponse(res, 200, "success", {
        Order_id: `ORD${invoiceNumber}`,
      });
    } else {
      errorResponse(res, 404, "Invalid module");
    }
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};
