const mongoose = require("mongoose");
const Receipt = require("../Models/receipt/voucherReceipt");
const { salesInvoiceSchema } = require("../Models/sales/salesInvoice");


// exports.createReceipt = async (req, res) => {
//   try {
//     const newReceipt = new Receipt(req.body);
//     await newReceipt.save();

//     res.status(201).json({ message: "Receipt added successfully", data: newReceipt });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding receipt", error });
//   }
// };


exports.createReceipt = async (req, res) => {
    try {
        console.log('createReceipt');
        const _id = req.decoded._id;
        
        const {receipt_id,issuing_date,customer_id, receipt_items, received_amount, account_type, reference_number, description } = req.body;
        console.log('receipt_id,issuing_date,customer_id, receipt_items, received_amount, account_type, reference_number, description',receipt_id,issuing_date,customer_id, receipt_items, received_amount, account_type, reference_number, description);
  
      if (!customer_id || !receipt_items || receipt_items.length === 0 || !received_amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      let totalReceived = 0;
  
      for (const item of receipt_items) {
        
        const invoice = await salesInvoiceSchema.findById(item.invoice_id);


        // console.log('invoice1',invoice);
        
        if (!invoice) {
            return res.status(400).json({ message: `Invoice ${item.invoice_id} not found` });
        }
  
        
  
        invoice.received_amount = (invoice.received_amount || 0) + item.settled_amount;
        invoice.balance_amount = invoice.gross_total - invoice.received_amount;
        invoice.payment_status = invoice.balance_amount === 0;
        await invoice.save();
        console.log('invoice',invoice);
        
        
        totalReceived += item.settled_amount;
    }
    console.log('totalReceived',totalReceived);
  
      const newReceipt = new Receipt({
        receipt_id,
        issuing_date,
        user_id: _id,
        customer_id,
        received_amount: totalReceived,
        account_type,
        reference_number,
        description,
        receipt_items,
      });
      console.log('newReceipt1',newReceipt);
      
  
      await newReceipt.save();
      console.log('newReceipt',newReceipt);

  
      res.status(201).json({ message: "Receipt added successfully", data: newReceipt });
    } catch (error) {
      res.status(500).json({ message: "Error adding receipt", error });
    }
  };

  