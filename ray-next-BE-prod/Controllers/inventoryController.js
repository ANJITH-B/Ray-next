const { inventorySchema } = require("../Models/inventoryModel");
const errorResponse = require("../Utils/errorResponse");
const successResponse = require("../Utils/successResponse");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// create a inventory product
module.exports.createInventory = async (req, res) => {
  const _id = req.decoded._id;
  const {
    name,
    item_code,
    barcode,
    category,
    brand,
    default_supplier,
    country_of_origin,
    purchase_rate,
    margin_percent,
    description,
    image_url,
    excludefromstock,
    active,
    unit_details,
  } = req.body;

  try {
    const newInventory = await inventorySchema.create({
      name,
      item_code,
      user_id:_id,
      barcode,
      category,
      brand,
      default_supplier,
      country_of_origin,
      purchase_rate,
      margin_percent,
      description,
      image_url,
      excludefromstock,
      active,
      unit_details,
    });

    return successResponse(res, 201, "success", { data: newInventory });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// list all with filter
module.exports.getAllInventory = async (req, res) => {
  const search = req.query.search?req.query.search:"";
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
            { name: { $regex: search, $options: "i" } }, // Case-insensitive search on customerName
            // Add more fields to search if needed
          ],
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

module.exports.imageupload = async (req,res) =>{

}

// product id auto generate
module.exports.inventoryIdGenerator = async (req,res) =>{
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
module.exports.categoryCounter = async (req,res) =>{
  try {
    const categoryArray = ["electronics","appliances","footwear","accessories"]
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
   return successResponse(res,200,"success",categoryCounts)
  

  } catch (error) {
    return errorResponse(res,500,error.message)
  }
}
