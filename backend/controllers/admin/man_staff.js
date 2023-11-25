// controllers/authController.js
const bcrypt = require('bcryptjs');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
const User = require('../../models/user');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');

exports.getStaff = catchAsyncErrors(async (req, res, next) => {

    try {
        const staffList = await User.findAll({
            where: {
                role: "staff"
              },
            }
        );
        return res.status(200).json({ success:true, staff: staffList });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));

      }
})

exports.addStaff = catchAsyncErrors(async (req, res, next) => {

    try {
        console.log('add staff')
        const { email, role, name, phone, password } = req.body;
        const checkUser = await User.findOne({ where: { email } });
        if (checkUser) {
           return  res.status(401).json({ 
            success: false,
            message: 'Email already in use!' });
        }

        const uid = role.slice(0, 2).toUpperCase() + uuidv1()
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ id: uid, email, role, name, phone, password: hashedPassword, avatar: req.file ? req.file.path : null  });

        return res.status(201).json({ 
            success: true,
            message: 'staff registered successfully', user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });

    } catch (error) {
        console.error(error);
        console.log(error);
        return next(new ErrorHandler('Internal server error!', 500));
    }
})

exports.editStaff = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, phone } = req.body;
    
        const staff = await Staff.findByPk(id);
    
        if (!staff) {
            return next(new ErrorHandler('Staff not found!', 404));
        }
        
        await staff.update({ name, phone });
    
        return res.status(200).json({ success:true, message: 'Staff updated successfully', staff });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

exports.deleteStaff = catchAsyncErrors(async (req, res, next) => {

    try {
        const { id } = req.params;
    
        const staff = await Staff.findByPk(id);
    
        if (!staff) {
            return next(new ErrorHandler('Staff not found!', 404));
        }
    
        await staff.destroy();
    
        return res.status(200).json({ success:true, message: 'Staff deleted successfully' });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }

})


