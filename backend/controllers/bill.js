const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { Bill, BillFoods, Food } = require('../models/relationship')

exports.getAllBills = catchAsyncErrors(async (req, res) => {
    try {
      const bills = await Bill.findAll({
        include: [
          {
            model: Food,
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
            model: Food,
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
      const { foods } = req.body;
  
      // Calculate total price
      const totalPrice = foods.reduce((acc, food) => acc + food.price * food.quantity, 0);
  
      // Create a new bill
      const bill = await Bill.create({ totalPrice });
  
      // Create associations with foods including the quantity
      await Promise.all(
        foods.map(async (food) => {
          const { foodId, quantity } = food;
          await BillFoods.create({
            billId: bill.id,
            foodId,
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
      const { foods } = req.body;
  
      // Calculate total price
      const totalPrice = foods.reduce((acc, food) => acc + food.price * food.quantity, 0);
  
      const bill = await Bill.findByPk(id);
  
      if (!bill) {
        return next(new ErrorHandler('Bill not found!', 404));
      }
  
      // Update bill details
      await bill.update({ totalPrice });
  
      // Update associations with foods including the quantity
      await Promise.all(
        foods.map(async (food) => {
          const { foodId, quantity } = food;
          const billFood = await BillFoods.findOne({ where: { billId: bill.id, foodId } });
  
          if (billFood) {
            await billFood.update({ quantity });
          } else {
            await BillFoods.create({ billId: bill.id, foodId, quantity });
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