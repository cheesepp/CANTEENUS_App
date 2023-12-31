const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { Bill, bill_item, Item, User } = require('../models/relationship')
const ErrorHandler = require('../util/ErrorHandler')
exports.getAllBills = catchAsyncErrors(async (req, res, next) => {
    try {
      const bills = await Bill.findAll({
        include: [
          {
            model: Item,
            as: 'item',
            attributes: ['id', 'name', 'price'],
            through: { attributes: ['quantity'] },
          },
        ],
      });
  
      res.json({success:true, bills: bills });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  }
)

  exports.getBillById = catchAsyncErrors(async (req, res,next) => {
    try {
      const { id } = req.params;
      const bill = await Bill.findByPk(id, {
        include: [
          {
            model: Item,
            as: "item",
            attributes: ['id', 'name', 'price'],
            through: { attributes: ['quantity'] },
          },
        ],
      });
  
      if (!bill) {
        return next(new ErrorHandler('Bill not found!', 404));
      }
  
      res.json({success:true, bill:bill });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })
  
  exports.addBill = catchAsyncErrors(async (req, res,next) => {
    try {
      const { items, payment } = req.body;
      console.log(req.body)
      // Calculate total price
      const totalPrice = items.reduce((acc, items) => {
        return acc + items.price * items.quantity
        }, 0
      );
  
      const userID = req.userId;
      const user = await User.findByPk(userID)

      let bill_user=null;
      if (user.role==="customer") {
          bill_user=userID
      }

      // Create a new bill
      const bill = await Bill.create({ totalPrice: totalPrice,user_id: bill_user, paymentMethod: payment });
  
      // Create associations with foods including the quantity
      await Promise.all(
        items.map(async (item) => {
          const { id, quantity } = item;
          await bill_item.create({
            bill_id: bill.id,
            item_id:id ,
            quantity: quantity,
          });
        })
      );
  
      res.status(201).json({success: true, message: 'Bill added successfully', bill:bill });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })
  
  exports.updateBill = catchAsyncErrors(async (req, res,next) => {
    try {
      const { id } = req.params;
      const { items } = req.body;
  
      // Calculate total price
     // const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
     const totalPrice = items.reduce((acc, items) => {
        return acc + items.price * items.quantity
        }, 0
      );
  
      const bill = await Bill.findByPk(id);
  
      if (!bill) {
        return next(new ErrorHandler('Bill not found!', 404));
      }
      const userID = req.userId;
      const user = await User.findByPk(userID)

      let bill_user=null;
      if (user.role==="customer") {
          bill_user=userID
      }

      console.log("items: ",items)
      items.map(async (item) => {
        console.log("item.id: ",item.item_id)
      })
  
      // Update bill details
      await bill.update({ totalPrice:totalPrice, user_id: bill_user });

      await Promise.all(items.map(async (item) => {
        await bill.setItem(
          [item.item_id],
          {
            through: {
              quantity: item.quantity
            }
          }
        );
      }));
  
      // Update associations with foods including the quantity
      // await Promise.all(
      //   items.map(async (item) => {
      //     const { itemId, quantity } = item;
      //     const billItem = await bill_item.findOne({ where: { billId: bill.id, itemId } });
  
      //     if (billItem) {
      //       await billItem.update({ quantity });
      //     } else {
      //       await bill_item.create({ billId: bill.id, itemId, quantity });
      //     }
      //   })
      // );
  
      res.json({success:true, message: 'Bill updated successfully', bill: bill });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })
  
  exports.deleteBill = catchAsyncErrors( async (req, res,next) => {
    try {
      const { id } = req.params;
  
      const bill = await Bill.findByPk(id);
  
      if (!bill) {
        return next(new ErrorHandler('Bill not found!', 404));
      }
  
      await bill.destroy();
  
      res.json({success: true, message: 'Bill deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler('Internal server error!', 500));
    }
  })