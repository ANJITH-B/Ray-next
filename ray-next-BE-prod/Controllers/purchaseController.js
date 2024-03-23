const { purchaseBillSchema } = require("../Models/purchase/purchaseBill");
const {
  PurchaseBillItemsSchema,
} = require("../Models/purchase/purchaseBillItems");
const { purchaseOrderSchema } = require("../Models/purchase/purchaseLPO");
const { purchaseReturnSchema } = require("../Models/purchase/purchaseReturn");
const {
  purchasereturnItemsSchema,
} = require("../Models/purchase/purchaseReturnItems");
const { suppliersSchema } = require("../Models/purchase/suppliers");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");
const { DateAdderFunction } = require("../Utils/helperFunctions");
const mongoose = require("mongoose");
const { regularAccountSchema } = require("../Models/accounts/chartRegularAccountModel");
const { journalSchema } = require("../Models/accounts/journalModel");
const { journalTransaction } = require("../Models/accounts/journalTransactionModel");
const accountBookTransaction = require("../Utils/accountBookTransaction");
const ObjectId = mongoose.Types.ObjectId;

// create purchase bill
module.exports.createPurchaseBill = async (req, res) => {
  const {
    purchase_bill_id,
    issuing_date,
    supplier_id,
    purchase_details, 
    other_details,
    summary,
    payment_type,
    gross_total,
    purchase_items,
    net_amount
  } = req.body;

  try {
   const _id = req.decoded._id;
    //get user id from token

    // check payment type , other than credit , payment status true and just save details

    if (payment_type == "CREDIT") {
      // if credit , check if limit exceeds , if exceeds send error

      const supplierDetails = await suppliersSchema.findById(supplier_id);

      if(!supplierDetails){
        throw new Error("Supplier not found")
      }

      if (gross_total > supplierDetails.credit_limit_amount) {
        return errorResponse(res, 401, "credit limit exceeded");
      }
      // if not exceeds reduce limit from supplier
      const newSupplierCreditBalance =
        supplierDetails.credit_limit_amount - gross_total;

      await suppliersSchema.updateOne(
        { _id: supplier_id },
        { credit_limit_amount: newSupplierCreditBalance }
      );

      //assign due date

      const credit_limit_days = supplierDetails.credit_limit_days;
      const due_date = DateAdderFunction(issuing_date, credit_limit_days);
   

      //update received balnace amount

      const balance_amount = gross_total;

      const received_amount = 0;

      //save bill

      const newpurchase = await purchaseBillSchema.create({
        purchase_bill_id,
        issuing_date,
        due_date,
        payment_type,
        user_id: _id,
        supplier_id,
        gross_total,
        purchase_details,
        other_details,
        summary,
        balance_amount,
        received_amount,
        payment_status:false,
        net_amount
      });

      const modifiedItems = await purchase_items.map((item) => ({
        ...item,
        user_id: _id,
        purchase_bill_id,
      }));

      const insertedItems = await PurchaseBillItemsSchema.insertMany(
        modifiedItems
      );
      // console.log("Items added successfully:", insertedItems);

      return successResponse(res, 201, "purchase bill created succesfully");
    } else {
      const newpurchase = await purchaseBillSchema.create({
        purchase_bill_id,
        issuing_date,
        due_date:null,
        payment_type,
        user_id: _id,
        supplier_id,
        gross_total,
        purchase_details,
        other_details,
        summary,
        balance_amount:0,
        received_amount:gross_total,
        payment_status:true,
        net_amount
      });

      const modifiedItems = await purchase_items.map((item) => ({
        ...item,
        user_id: _id,
        purchase_bill_id,
      }));

      const insertedItems = await PurchaseBillItemsSchema.insertMany(
        modifiedItems
      );
      // console.log("Items added successfully:", insertedItems);


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

      const purchaseAccount = await regularAccountSchema.findOne({
        user_id: _id,
        account_name: "Purchase account",
      });
      const cashAccount = await regularAccountSchema.findOne({
        user_id: _id,
        account_name: "Cash account",
      });
      // sales account
      CurrentBalanceUpdater(
        purchaseAccount._id,
        gross_total,
        "CR",
        "Purchase account",
        gross_total,
        0
      );

      // cash account
      CurrentBalanceUpdater(
        cashAccount._id,
        gross_total,
        "DR",
        "Cash account",
        0,
        gross_total
      );


    
 


      return successResponse(res, 201, "purchase bill created succesfully");
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

// create purchase return

module.exports.createPurchaseReturn = async (req, res) => {
  const {
    purchase_return_id,
    issuing_date,
    supplier_id,
    purchase_return_details,
    other_details,
    summary,
    purchase_return_items,
  } = req.body;

  try {
   const _id = req.decoded._id;
    const newPurchaseReturn = await purchaseReturnSchema.create({
      purchase_return_id,
      issuing_date,
      supplier_id,
      user_id: _id,
      purchase_return_details,
      other_details,
      summary,
    });

    // add purchase return items

    const modifiedItems = await purchase_return_items.map((item) => ({
      ...item,
      user_id: _id,
      purchase_return_id,
    }));

    const insertedItems = await purchasereturnItemsSchema.insertMany(
      modifiedItems
    );

    return successResponse(res, 201, "purchase return created succesfully");
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

//create purchase lpo

module.exports.createPurchaseLPO = async (req, res) => {
  const {
    purchase_order_id,
    issuing_date,
    supplier_id,
    purchase_order_details,
    other_details,
    summary,
    purchase_order_items,
  } = req.body;

  try {
  const  _id = req.decoded._id;
    const newPurchaseOrder = await purchaseOrderSchema.create({
      purchase_order_id,
      issuing_date,
      user_id: _id,
      supplier_id,
      purchase_order_details,
      other_details,
      summary,
      purchase_order_items,
    });

    return successResponse(res, 201, "purchase LPO created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//create suppliers

module.exports.createSupplier = async (req, res) => {
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
    const newSupplier = await suppliersSchema.create({
      name,
      account_code,
      under_group,
      user_id:_id,
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
    });

    

    return successResponse(res, 201, "supplier created successfully",newSupplier);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


//  get all Bills

module.exports.getAllPurchaseBills = async (req, res) => {
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
          from: "suppliers", // Replace with the actual name of your supplier collection
          localField: "supplier_id",
          foreignField: "_id", // Assuming supplier documents have an _id field
          as: "supplierInfo",
        },
      },
      {
        $unwind: {
          path: "$supplierInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              "supplierInfo.name": {
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
    const allBills = await purchaseBillSchema.aggregate(pipeline).exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: allBills,
    };

    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//get single bill
module.exports.getPurchaseBillDetails = async (req, res) => {
  const _id = req.decoded._id;
  const purchase_bill_id = req.params.purchase_bill_id;
  try {
    const pipeline = [
      {
        $match: {
          $and: [{ user_id: new ObjectId(_id) }, { purchase_bill_id: purchase_bill_id }],
        },
      },
      {
        $lookup: {
          from: "purchase_bill_items", // Replace with the actual name of your customer collection
          localField: "purchase_bill_id",
          foreignField: "purchase_bill_id", // Assuming customer documents have an _id field
          as: "purchase_bill_items",
        },
      },
      {
        $lookup: {
          from: "suppliers", // Replace with the actual name of your supplier collection
          localField: "supplier_id",
          foreignField: "_id", // Assuming supplier documents have an _id field
          as: "supplierInfo",
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

    const purchase_bill_details = await purchaseBillSchema.aggregate(pipeline).exec();
    if (!purchase_bill_details) {
      return errorResponse(res, 404, "purchase bill doesn't exist");
    }

    return successResponse(res, 200, "success", purchase_bill_details);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// get all returns

module.exports.getAllPurchaseReturn = async (req, res) => {
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
          from: "suppliers", // Replace with the actual name of your supplier collection
          localField: "supplier_id",
          foreignField: "_id", // Assuming supplier documents have an _id field
          as: "supplierInfo",
        },
      },
      {
        $unwind: {
          path: "$supplierInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              "supplierInfo.name": {
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
    const all_purchase_return_items = await purchaseReturnSchema
      .aggregate(pipeline)
      .exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: all_purchase_return_items,
    };

    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

//get single return

module.exports.getSinglePurhaseReturnDetails = async (req, res) => {
  const _id = req.decoded._id;
  const purchase_return_id = req.params.purchase_return_id;
  try {
    const pipeline = [
      {
        $match: {
          $and: [{ user_id: new ObjectId(_id) }, { purchase_return_id: purchase_return_id }],
        },
      },
      {
        $lookup: {
          from: "purchase_return_items", // Replace with the actual name of your customer collection
          localField: "purchase_return_id",
          foreignField: "purchase_return_id", // Assuming customer documents have an _id field
          as: "purchase_return_items",
        },
      },
      {
        $lookup: {
          from: "suppliers", // Replace with the actual name of your supplier collection
          localField: "supplier_id",
          foreignField: "_id", // Assuming supplier documents have an _id field
          as: "supplierInfo",
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

    const purchase_return_items = await purchaseReturnSchema
      .aggregate(pipeline)
      .exec();
    if (!purchase_return_items) {
      return errorResponse(res, 404, "purchase return doesn't exist");
    }

    return successResponse(res, 200, "success", purchase_return_items);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


//get all purchase orders
module.exports.getAllPurchaseOrders = async (req, res) => {
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
          from: "suppliers", // Replace with the actual name of your supplier collection
          localField: "supplier_id",
          foreignField: "_id", // Assuming supplier documents have an _id field
          as: "supplierInfo",
        },
      },
      {
        $unwind: {
          path: "$supplierInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $or: [
            {
              "supplierInfo.name": {
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
    const all_purchase_order = await purchaseOrderSchema.aggregate(pipeline).exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: all_purchase_order,
    };

    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// get single purchase order

module.exports.getSinglePurchaseOrder = async (req, res) => {
  const _id = req.decoded._id;
  const purchase_order_id = req.params.purchase_order_id;
  try {
    const purchase_order_details = await purchaseOrderSchema.findOne({
      purchase_order_id,
      user_id:new ObjectId(_id)
    }).populate("supplier_id")
    .populate("user_id");;

    if (!purchase_order_details) {
      return errorResponse(res, 404, "purchase order doesnt exist");
    }

    return successResponse(res, 200, "success", purchase_order_details);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// get all suppliers
module.exports.getAllSuppliers = async (req, res) => {
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
          suppliers: [
            { $skip: (page - 1) * perPageItems },
            { $limit: perPageItems }, 
          ],
        },
      },
    ];

    const result = await suppliersSchema.aggregate(pipeline);

    if (result.length === 0) {
      return res.status(404).json({ message: "No suppliers found" });
    }

   
    const suppliers = result[0].suppliers;


    const final_result = {
      page,
      perPageItems,
      data: suppliers,
    };

    return successResponse(res, 200, "success", final_result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


//sales id generator
module.exports.purchaseIDgenerator = async (req,res) => {
  const _id = req.decoded._id;
  const moduleName = req.query.module;
  try {
    if (moduleName == "bill") {
      const allPurchases = await purchaseBillSchema.find({ user_id: _id });
      const purchaseID = allPurchases.length;

      return successResponse(res, 200, "success", {
        Bill_id: `BIL${purchaseID}`,
      });
    } else if (moduleName == "return") {
      const allPurchases = await purchaseReturnSchema.find({ user_id: _id });
      const purchaseID = allPurchases.length;

      return successResponse(res, 200, "success", {
        return_id: `RET${purchaseID}`,
      });
    }  else if (moduleName == "order") {
      const allPurchases = await purchaseOrderSchema.find({ user_id: _id });
      const purchaseID = allPurchases.length;

      return successResponse(res, 200, "success", {
        order_id: `ORD${purchaseID}`,
      });
    } else {
      errorResponse(res, 404, "Invalid module");
    }
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};