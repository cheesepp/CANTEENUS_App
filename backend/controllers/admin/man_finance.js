//management income, expense, profit

const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Bill, User } = require('../../models/relationship');
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const ErrorHandler = require('../../util/ErrorHandler')
const { Op, Sequelize } = require('sequelize');
//get income by month
const getIncomeByMonth = catchAsyncErrors(async (req,res,next)=> {
    try {
        const { month, year } = req.body;
        const bills = await Bill.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH',Sequelize.col('createdAt')), month),
                    Sequelize.where(Sequelize.fn('YEAR',Sequelize.col('createdAt')),year)
                ]
            
            }
        });
        //console.log("targets: ",targets)
        res.status(200).json({ success:true,  targets: targets });

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})