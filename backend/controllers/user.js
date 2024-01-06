// controllers/user.js
const bcrypt = require('bcryptjs');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
const User = require('../models/user');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const {Item, item_ingredient, Ingredient} = require('../models/relationship');
const ErrorHandler = require('../util/ErrorHandler');
const { get } = require('mongoose');

const { Op } = require('sequelize');

const getUser = catchAsyncErrors(async (req, res, next) => {

    try {
        const id = req.userId;
        console.log("user id:",id)
        const user = await User.findAll({
            where: {
                id: id
              },
            }
        );

        
        res.status(200).json({ success:true, user: user });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));

      }
})
const editUser = catchAsyncErrors(async (req,res,next)=> {
  try {
    const id = req.userId;
    console.log("user id:",id)
    const { email, name, bankAccount, phone } = req.body;

    const user = await User.findAll({
        where: {
            id: id
          },
        }
    );
    
    if (!user) {
      return next(new ErrorHandler('user not found!', 404));
  }
  
  await user.update({ email:email, name:name, bankAccount: bankAccount, phone:phone });
  res.status(200).json({ success:true,message: 'User information updated successfully', user: user });

  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));

  }
})
const userChangePassword = catchAsyncErrors(async (req,res,next)=> {
  try {
    const id = req.userId;
    console.log("user id:",id)
    const { currentPassword, newPassword, retypeNewPassword } = req.body;
    
    const record = await User.findOne({
        where: {
            id: id
          },
        }
    );
    
    if (!record) {
      return next(new ErrorHandler('user not found!', 404));
    }

    const user = record.dataValues;
    console.log("user:",user)
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ 
            success: false,
            message: 'Invalid credentials - Password is not correct' });
    }
    if (newPassword!==retypeNewPassword) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials - New password and retype are not same' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

  
    await record.update({ password: hashedPassword});
    res.status(200).json({ success:true,message: 'User password updated successfully', user: user });

  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));

  }
})
const getMenu = catchAsyncErrors(async (req,res, next)=> {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Ingredient,
          attributes: ['id', 'name', 'quantity'],//,'rating','price'
          through: {
            model: item_ingredient,
            attributes: ['quantity'],
          },
        },
      ],
    });
    res.json({ success:true, items:items });

  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));

  }
})

const getAllChatOfUser = catchAsyncErrors(async (req, res, next)=> {
  try {
    const id = req.userId;
    const record = await User.findAll({
        where: {
            id: {
              [Op.ne]: id,
            },
            [Op.or]: [
              { role: 'admin' },
              { role: 'staff' },
              { role: 'customer' },
            ],
          },
        }
    );
    //console.log("list user in chat: ",record)
    const listUser = record.map(user=> ({
      id: user.dataValues.id,
      email:user.dataValues.email,
      role:user.dataValues.role,
      name:user.dataValues.name,
      phone:user.dataValues.phone,
    }))
    res.json({ success:true, listUser: listUser})
    
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
module.exports ={
    getUser: getUser,
    editUser: editUser,
    userChangePassword: userChangePassword,
    getMenu: getMenu,
    getAllChatOfUser: getAllChatOfUser,
}