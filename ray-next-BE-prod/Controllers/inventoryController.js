const { inventorySchema } = require("../Models/inventory/inventoryModel");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Notification = require("../Models/notificationModel");
const createSystemLog = require("../Utils/createSystemLog");

module.exports.createInventory = async (req, res) => {
  console.log('createInventory start');
  
  const _id = req.decoded._id;
  const {
    name,
    item_code,
    barcode,
    category,
    brand,
    valuation,
    stock,
    stock_unit,
    minimum_quantity,
    // image_url,
    excludefromstock,
    active,
    unit_details,
  } = req.body;
  const imageUrl = req.file ? req.file.filename : null;
  

  
  

  try {
    const newInventory = await inventorySchema.create({
      name,
      item_code,
      user_id: _id,
      barcode,
      stock,
      stock_unit,
      minimum_quantity,
      valuation,
      // image_url,
      image_url: imageUrl,
      excludefromstock,
      active,
      unit_details: JSON.parse(unit_details) || [],
      ...(category && { category }),
      ...(brand && { brand })
    });

    const notification = new Notification({
      message: `New Inventory Added: ${newInventory.name}`,
      type: "success",
    });
    await notification.save();
    
    req.io.emit("receive_notification", notification);


    await createSystemLog(_id, "CREATE", "INVENTORY", [
      { field: "name", value: name },
      { field: "item_code", value: item_code },
      { field: "barcode", value: barcode },
      { field: "category", value: category },
      { field: "brand", value: brand },
      { field: "stock", value: stock },
      { field: "valuation", value: valuation }
    ]);

    return successResponse(res, 201, "success", { data: newInventory });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// module.exports.updateInventory = async (req, res) => {
//   console.log("updateInventory start");
  
//   const { id } = req.params;
//   const {
//     name,
//     item_code,
//     barcode,
//     category,
//     brand,
//     valuation,
//     stock,
//     stock_unit,
//     minimum_quantity,
//     image_url,
//     excludefromstock,
//     active,
//     unit_details
//   } = req.body;
//   const imageUrl = req.file ? req.file.filename : (image_url? image_url:null);

//   try {
//     const updatedInventory = await inventorySchema.findByIdAndUpdate(
//       id,
//       {
//         name,
//         item_code,
//         barcode,
//         category,
//         brand,
//         valuation,
//         stock,
//         stock_unit,
//         minimum_quantity,
//         image_url: imageUrl || null,
//         excludefromstock,
//         active,
//         unit_details: JSON.parse(unit_details) || [] 
//       },
//       { new: true, runValidators: true }
//     );
//     console.log('updatedInventory', updatedInventory);

//     if (!updatedInventory) {
//       return errorResponse(res, 404, "Inventory item not found");
//     }

//     return successResponse(res, 200, "Inventory updated successfully", {
//       data: updatedInventory,
//     });
//   } catch (error) {
//     return errorResponse(res, 500, error.message);
//   }
// };


module.exports.updateInventory = async (req, res) => {
  console.log("updateInventory start");
  const { id } = req.params;
  const {
    name, item_code, barcode, category, brand, valuation, stock, stock_unit, 
    minimum_quantity, image_url, excludefromstock, active, unit_details
  } = req.body;
  const imageUrl = req.file ? req.file.filename : (image_url ? image_url : null);

  try {
    const oldInventory = await inventorySchema.findById(id);
    if (!oldInventory) {
      return errorResponse(res, 404, "Inventory item not found");
    }

    // Track changes
    let changes = [];
    const fieldsToCheck = ["name", "item_code", "barcode", "category", "brand", "valuation", "stock"];
    fieldsToCheck.forEach(field => {
      if (oldInventory[field] !== req.body[field]) {
        changes.push({
          field,
          oldValue: oldInventory[field],
          newValue: req.body[field]
        });
      }
    });

    const updatedInventory = await inventorySchema.findByIdAndUpdate(
      id,
      {
        name, item_code, barcode, category, brand, valuation, stock, stock_unit,
        minimum_quantity, image_url: imageUrl || null, excludefromstock, active,
        unit_details: JSON.parse(unit_details) || []
      },
      { new: true, runValidators: true }
    );

    console.log("updatedInventory", updatedInventory);

    // Log system action
    await createSystemLog(req.decoded._id, "UPDATE", "INVENTORY", changes);

    return successResponse(res, 200, "Inventory updated successfully", { data: updatedInventory });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// list all with filter
module.exports.getAllInventory = async (req, res) => {
  const search = req.query.search ? req.query.search : "";
  const _id = req.decoded._id;
  const perPageItems = req.query.perpageitems
    ? parseInt(req.query.perpageitems)
    : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  try {
    const skipCount = (page - 1) * perPageItems;
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
          $or: [
            { name: { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brandDetails",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: { path: "$brandDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1, // Keep the original _id if needed
          name: 1,
          item_code: 1,
          user_id: 1,
          barcode: 1,
          default_supplier: 1,
          country_of_origin: 1,
          purchase_rate: 1,
          margin_percent: 1,
          description: 1,
          image_url: 1,
          excludefromstock: 1,
          active: 1,
          unit_details: 1,
          // brand: "$brandDetails.name",
          // category: "$categoryDetails.name",
          brand: {
            id: "$brandDetails._id",
            name: "$brandDetails.name",
          },
          category: {
            id: "$categoryDetails._id",
            name: "$categoryDetails.name",
          },
          valuation: 1,
          stock: 1,
          stock_unit: 1,
          minimum_quantity: 1,
        },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: perPageItems,
      },
    ];

    const allInventories = await inventorySchema.aggregate(pipeline).exec();

    const result = {
      page: page,
      perPageItems: perPageItems,
      data: allInventories,
    };
    return successResponse(res, 200, "success", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
// for search in sales and purchase

// handle product image upload
// setup multer for this 

module.exports.imageupload = async (req, res) => {

}

// product id auto generate
module.exports.inventoryIdGenerator = async (req, res) => {
  const _id = req?.decoded?._id;
  try {
    const allInventories = await inventorySchema.find({ user_id: _id });
    const inventoryNumber = allInventories.length;

    return successResponse(res, 200, "success", {
      product_id: `PRD${inventoryNumber}`,
    });
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
}

// category_items_counter_api
module.exports.categoryCounter = async (req, res) => {
  try {
    const categoryArray = ["electronics", "appliances", "footwear", "accessories"]
    // find how many products for each cat
    const pipeline = [
      {
        $match: {
          category: { $in: categoryArray }
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ];



    const result = await inventorySchema.aggregate(pipeline).exec()



    const categoryCounts = {};

    result.forEach((entry) => {
      console.log(entry)
      categoryCounts[entry._id] = entry.count;
    });

    // Now categoryCounts contains the count of products for each category
    return successResponse(res, 200, "success", categoryCounts)


  } catch (error) {
    return errorResponse(res, 500, error.message)
  }
}


// module.exports.deleteInventory = async (req, res) => {
//   try {
//     await inventorySchema.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Inventory deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await inventorySchema.findById(req.params.id);
    if (!inventory) {
      return errorResponse(res, 404, "Inventory not found");
    }

    await inventorySchema.findByIdAndDelete(req.params.id);

    await createSystemLog(req.decoded._id, "DELETE", "INVENTORY", [
      { field: "name", value: inventory.name },
      { field: "item_code", value: inventory.item_code }
    ]);

    return successResponse(res, 200, "Inventory deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports.getLowStock = async (req, res) => {
  const search = req.query.search ? req.query.search : "";
  const _id = req.decoded._id;
  const perPageItems = req.query.perpageitems ? parseInt(req.query.perpageitems) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  try {
    const skipCount = (page - 1) * perPageItems;
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
          $expr: { $gt: ["$minimum_quantity", "$stock"] },
          $or: [{ name: { $regex: search, $options: "i" } }],
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brandDetails",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: { path: "$brandDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          item_code: 1,
          stock: 1,
          minimum_quantity: 1,
          active: 1,
          brand: { id: "$brandDetails._id", name: "$brandDetails.name" },
          category: { id: "$categoryDetails._id", name: "$categoryDetails.name" },
        },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: perPageItems,
      },
    ];

    const lowStockItems = await inventorySchema.aggregate(pipeline).exec();
    const result = {
      page: page,
      perPageItems: perPageItems,
      data: lowStockItems,
    };

    return successResponse(res, 200, "Low stock items retrieved successfully", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports.getNegativeStock = async (req, res) => {
  const search = req.query.search ? req.query.search : "";
  const _id = req.decoded._id;
  const perPageItems = req.query.perpageitems ? parseInt(req.query.perpageitems) : 10;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  try {
    const skipCount = (page - 1) * perPageItems;
    const pipeline = [
      {
        $match: {
          user_id: new ObjectId(_id),
          stock: { $lt: 0 },
          $or: [{ name: { $regex: search, $options: "i" } }],
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brandDetails",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: { path: "$brandDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          item_code: 1,
          stock: 1,
          minimum_quantity: 1,
          active: 1,
          brand: { id: "$brandDetails._id", name: "$brandDetails.name" },
          category: { id: "$categoryDetails._id", name: "$categoryDetails.name" },
        },
      },
      {
        $skip: skipCount,
      },
      {
        $limit: perPageItems,
      },
    ];

    const negativeStockItems = await inventorySchema.aggregate(pipeline).exec();
    const result = {
      page: page,
      perPageItems: perPageItems,
      data: negativeStockItems,
    };

    return successResponse(res, 200, "Negative stock items retrieved successfully", result);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};