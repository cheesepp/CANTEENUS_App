// controllers/management business.js
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Ingredient, BusinessTarget } = require('../../models/relationship');
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const ErrorHandler = require('../../util/ErrorHandler')


//get all business target
const getAllTarget = catchAsyncErrors(async (req,res,next)=> {
    try {
        const targets = await BusinessTarget.findAll();
        //console.log("targets: ",targets)
        res.status(200).json({ success:true,  targets: targets });

    } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

//get a business target by id
const getTargetById = catchAsyncErrors(async (req,res,next)=>{
    try {
        const { id } = req.params;
        const target = await BusinessTarget.findByPk(id);
    
        if (!target) {
          return next(new ErrorHandler('Target not found!', 404));
        }
    
        res.json({ success:true, target: target });

      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

//add a new business target
const addTarget = catchAsyncErrors(async (req,res,next)=> {
    try {
        console.log("add target")
        const { target ,date } = req.body;
        console.log("req.body: ",req.body)
    
        
        const businessTarget = await BusinessTarget.create({
          target:target, date:date
        });
    
        res.status(201).json({ success: true, message: 'Target added successfully', businessTarget: businessTarget });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

//update business target by id
const updateTarget = catchAsyncErrors(async (req,res, next)=> {
    try {
        const { id } = req.params;
        const { target, date } = req.body;
    
        const businessTarget = await BusinessTarget.findByPk(id);
    
        if (!businessTarget) {
          return res.status(404).json({ error: 'Business Target not found' });
        }
    
        await businessTarget.update({
          target: target, date:date
        });
    
        res.json({ success:true, message: 'Business Target updated successfully', businessTarget: businessTarget});
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

//delete a business target by id
const deleteTarget = catchAsyncErrors(async (req,res,next)=> {
    try {
        const { id } = req.params;
    
        const businessTarget = await BusinessTarget.findByPk(id);
    
        if (!businessTarget) {
          return res.status(404).json({ error: 'Business Target not found' });
        }
    
        await businessTarget.destroy();
    
        res.json({ success:true, message: 'Business Target deleted successfully' });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Internal server error!', 500));
      }
})

module.exports ={
    getAllTarget: getAllTarget,
    getTargetById: getTargetById,
    addTarget: addTarget,
    updateTarget: updateTarget,
    deleteTarget: deleteTarget,
}