//management income, expense, profit

const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Bill, User, Ingredient, Item, item_ingredient, bill_item} = require('../../models/relationship');
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const ErrorHandler = require('../../util/ErrorHandler')
const { Op, Sequelize } = require('sequelize');
const DateTime = require('../../util/DateTime')
//get income by month
const getProfitOfPreviousMonth = async (month, year) => {
    const { previousMonth, previousYear } = DateTime.getPreviousMonthAndYear(month, year);
    try {
        const record = await Bill.findAll({
            attributes: ['id','totalPrice','user_id'],
            where: {
                //'$Bill.updatedAt$': Sequelize.literal(`YEAR(updatedAt) = ${year} AND MONTH(updatedAt) = ${month}`),
                // [Op.and]: [
                //     Sequelize.where(Sequelize.fn('MONTH',Sequelize.col('updatedAt')), month),
                //     Sequelize.where(Sequelize.fn('YEAR',Sequelize.col('updatedAt')),year)
                    
                // ]
                [Op.and]: [
                    Sequelize.literal(`YEAR(\`Bill\`.\`updatedAt\`) = ${previousYear}`),
                    Sequelize.literal(`MONTH(\`Bill\`.\`updatedAt\`) = ${previousMonth}`)
                  ]
            
            }, 
            include: [
                {
                    model: Item,
                    as: 'item',
                    attributes: ['id', 'name', 'price'],
                    through: { 
                        model: bill_item,
                        as: 'bill_item',
                        attributes: ['quantity'] },
                    include: [
                        {
                            model: Ingredient,
                            as: 'ingredient',
                            attributes: ['id','name','price'],
                            through: {
                                model: item_ingredient,
                                as: 'item_ingredient',
                                attributes: ['quantity']
                            }
                        }
                    ]
                }

            ],
            
        });

        let expense =0;
        //const bills = record[0].dataValues
       console.log("Something previous: ",record)
        record.forEach(billInRecord => {
            billInRecord.item.forEach(itemInBill => {
                let totalIngredientPrice =0;

                itemInBill.ingredient.forEach(ingredientInItem => {
                    totalIngredientPrice += (ingredientInItem.item_ingredient.quantity * ingredientInItem.price)
                })

                expense+=(totalIngredientPrice * itemInBill.bill_item.quantity)
            })
        })
        

        
        let income = 0;
        record.forEach(billInRecord => {
            income+= billInRecord.totalPrice;
        })
        const profit = income - expense;

        

        return { success:true,expense:expense, income:income, profit: profit };

    } catch (error) {
        console.error(error);
      }
}
const getProfitByMonth = catchAsyncErrors(async (req,res,next)=> {
    try {
        const { month, year } = req.body;
        const record = await Bill.findAll({
            attributes: ['id','totalPrice','user_id'],
            where: {
                //'$Bill.updatedAt$': Sequelize.literal(`YEAR(updatedAt) = ${year} AND MONTH(updatedAt) = ${month}`),
                // [Op.and]: [
                //     Sequelize.where(Sequelize.fn('MONTH',Sequelize.col('updatedAt')), month),
                //     Sequelize.where(Sequelize.fn('YEAR',Sequelize.col('updatedAt')),year)
                    
                // ]
                [Op.and]: [
                    Sequelize.literal(`YEAR(\`Bill\`.\`updatedAt\`) = ${year}`),
                    Sequelize.literal(`MONTH(\`Bill\`.\`updatedAt\`) = ${month}`)
                  ]
            
            }, 
            include: [
                {
                    model: Item,
                    as: 'item',
                    attributes: ['id', 'name', 'price'],
                    through: { 
                        model: bill_item,
                        as: 'bill_item',
                        attributes: ['quantity'] },
                    include: [
                        {
                            model: Ingredient,
                            as: 'ingredient',
                            attributes: ['id','name','price'],
                            through: {
                                model: item_ingredient,
                                as: 'item_ingredient',
                                attributes: ['quantity']
                            }
                        }
                    ]
                }

            ],
            
        });

        let expense =0;
        //const bills = record[0].dataValues
       //console.log("Something: ",record)
        record.forEach(billInRecord => {
            billInRecord.item.forEach(itemInBill => {
                let totalIngredientPrice =0;

                itemInBill.ingredient.forEach(ingredientInItem => {
                    totalIngredientPrice += (ingredientInItem.item_ingredient.quantity * ingredientInItem.price)
                })

                expense+=(totalIngredientPrice * itemInBill.bill_item.quantity)
            })
        })
        

        
        let income = 0;
        record.forEach(billInRecord => {
            income+= billInRecord.totalPrice;
        })
        const profit = income - expense;

        const averageExpensePerWeek = expense/4;
        const averageIncomePerWeek = expense/4;
        

        const previousMonthBusinessResult = await getProfitOfPreviousMonth(month, year);

        let compareRatio=0
        if (previousMonthBusinessResult.profit!=0) {
            const ratio = profit/previousMonthBusinessResult.profit;
            compareRatio =  (ratio-1)*100;
        }
        

        //console.log("targets: ",targets)
        res.status(200).json({ success:true,expense:expense, 
                                income:income, profit: profit,
                                averageExpensePerWeek: averageExpensePerWeek, 
                                averageIncomePerWeek:averageIncomePerWeek, 
                                compareRatio: compareRatio});

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
    }
})
const getProfitPerMonth = async (month, year)=> {
    try {
        
        const record = await Bill.findAll({
            attributes: ['id','totalPrice','user_id'],
            where: {
                //'$Bill.updatedAt$': Sequelize.literal(`YEAR(updatedAt) = ${year} AND MONTH(updatedAt) = ${month}`),
                // [Op.and]: [
                //     Sequelize.where(Sequelize.fn('MONTH',Sequelize.col('updatedAt')), month),
                //     Sequelize.where(Sequelize.fn('YEAR',Sequelize.col('updatedAt')),year)
                    
                // ]
                [Op.and]: [
                    Sequelize.literal(`YEAR(\`Bill\`.\`updatedAt\`) = ${year}`),
                    Sequelize.literal(`MONTH(\`Bill\`.\`updatedAt\`) = ${month}`)
                  ]
            
            }, 
            include: [
                {
                    model: Item,
                    as: 'item',
                    attributes: ['id', 'name', 'price'],
                    through: { 
                        model: bill_item,
                        as: 'bill_item',
                        attributes: ['quantity'] },
                    include: [
                        {
                            model: Ingredient,
                            as: 'ingredient',
                            attributes: ['id','name','price'],
                            through: {
                                model: item_ingredient,
                                as: 'item_ingredient',
                                attributes: ['quantity']
                            }
                        }
                    ]
                }

            ],
            
        });

        let expense =0;
        //const bills = record[0].dataValues
       //console.log("Something: ",record)
        record.forEach(billInRecord => {
            billInRecord.item.forEach(itemInBill => {
                let totalIngredientPrice =0;

                itemInBill.ingredient.forEach(ingredientInItem => {
                    totalIngredientPrice += (ingredientInItem.item_ingredient.quantity * ingredientInItem.price)
                })

                expense+=(totalIngredientPrice * itemInBill.bill_item.quantity)
            })
        })
        

        
        let income = 0;
        record.forEach(billInRecord => {
            income+= billInRecord.totalPrice;
        })
        const profit = income - expense;

        return ({ success:true,expense:expense, 
                                income:income, profit: profit
                               });

    } catch (error) {
        console.error(error);
    }
}
const getProfitOfAYear = catchAsyncErrors(async (req,res,next)=> {
    try {
        const {  year } = req.body;
        
        let list = []
        for (let i=1;i<=12;i++) {
            const monthProfit = await getProfitPerMonth(i,year)
            list.push({ month: i, year:year, monthProfit: monthProfit})
        }

        //console.log("targets: ",targets)
        res.status(200).json({ success:true,list: list });

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

const getProfitByYear = catchAsyncErrors(async (req,res,next)=> {
    try {
        const {  year } = req.body;
        const record = await Bill.findAll({
            attributes: ['id','totalPrice','user_id'],
            where: {
                //'$Bill.updatedAt$': Sequelize.literal(`YEAR(updatedAt) = ${year} AND MONTH(updatedAt) = ${month}`),
                // [Op.and]: [
                //     Sequelize.where(Sequelize.fn('MONTH',Sequelize.col('updatedAt')), month),
                //     Sequelize.where(Sequelize.fn('YEAR',Sequelize.col('updatedAt')),year)
                    
                // ]
                [Op.and]: [
                    Sequelize.literal(`YEAR(\`Bill\`.\`updatedAt\`) = ${year}`)
                  ]
            
            }, 
            include: [
                {
                    model: Item,
                    as: 'item',
                    attributes: ['id', 'name', 'price'],
                    through: { 
                        model: bill_item,
                        as: 'bill_item',
                        attributes: ['quantity'] },
                    include: [
                        {
                            model: Ingredient,
                            as: 'ingredient',
                            attributes: ['id','name','price'],
                            through: {
                                model: item_ingredient,
                                as: 'item_ingredient',
                                attributes: ['quantity']
                            }
                        }
                    ]
                }

            ],
            
        });

        let expense = 0;
        ///const bills = record;//[0].dataValues
       console.log("Something: ",record)
       record.forEach(billInRecord => {
            billInRecord.item.forEach(itemInBill => {
                let totalIngredientPrice =0;
                itemInBill.ingredient.forEach(ingredientInItem => {
                    totalIngredientPrice += (ingredientInItem.item_ingredient.quantity * ingredientInItem.price)
                })
                expense+=(totalIngredientPrice * itemInBill.bill_item.quantity)
            })
       })
        
        let income = 0;
        record.forEach(billInRecord => {
            income+= billInRecord.totalPrice;
        })

        const profit = income - expense;


        //console.log("targets: ",targets)
        res.status(200).json({ success:true,expense:expense, income:income, profit: profit });

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

module.exports = {
    getProfitByMonth: getProfitByMonth,
    getProfitByYear: getProfitByYear,
    getProfitOfAYear: getProfitOfAYear,

}