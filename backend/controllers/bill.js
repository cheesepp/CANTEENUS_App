const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { Bill, bill_item, Item } = require('../models/relationship')

exports.getAllBills = catchAsyncErrors(async (req, res) => {
    try {
      const bills = await Bill.findAll({
        include: [
          {
            model: Item,
            attributes: ['id', 'name', 'price'],
            through: { attributes: ['quantity'] },
          },
        ],
      });
  
      res.json({ bills });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  }
)

  exports.getBillById = catchAsyncErrors(async (req, res) => {
    try {
      const { id } = req.params;
      const bill = await Bill.findByPk(id, {
        include: [
          {
            model: Item,
            attributes: ['id', 'name', 'price'],
            through: { attributes: ['quantity'] },
          },
        ],
      });
  
      if (!bill) {
        return next(new ErrorHandler('Bill not found!', 404));
      }
  
      res.json({ bill });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })
  
  exports.addBill = catchAsyncErrors(async (req, res) => {
    try {
      const { items } = req.body;
  
      // Calculate total price
      const totalPrice = items.reduce((acc, items) => acc + items.price * items.quantity, 0);
  
      // Create a new bill
      const bill = await Bill.create({ totalPrice });
  
      // Create associations with foods including the quantity
      await Promise.all(
        foods.map(async (item) => {
          const { itemId, quantity } = item;
          await bill_item.create({
            billId: bill.id,
            itemId,
            quantity,
          });
        })
      );
  
      res.status(201).json({ message: 'Bill added successfully', bill });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })
  
  exports.updateBill = catchAsyncErrors(async (req, res) => {
    try {
      const { id } = req.params;
      const { items } = req.body;
  
      // Calculate total price
      const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
      const bill = await Bill.findByPk(id);
  
      if (!bill) {
        return next(new ErrorHandler('Bill not found!', 404));
      }
  
      // Update bill details
      await bill.update({ totalPrice });
  
      // Update associations with foods including the quantity
      await Promise.all(
        items.map(async (item) => {
          const { itemId, quantity } = item;
          const billItem = await bill_item.findOne({ where: { billId: bill.id, itemId } });
  
          if (billItem) {
            await billItem.update({ quantity });
          } else {
            await bill_item.create({ billId: bill.id, itemId, quantity });
          }
        })
      );
  
      res.json({ message: 'Bill updated successfully', bill });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })
  
  exports.deleteBill = catchAsyncErrors( async (req, res) => {
    try {
      const { id } = req.params;
  
      const bill = await Bill.findByPk(id);
  
      if (!bill) {
        return next(new ErrorHandler('Bill not found!', 404));
      }
  
      await bill.destroy();
  
      res.json({ message: 'Bill deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })