// controllers/foodController.js
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Food, Material, FoodMaterials} = require('../../models/relationship');

// Get all foods
exports.getAllFoods = catchAsyncErrors(async (req, res) => {
  try {
    const foods = await Food.findAll({
      include: [
        {
          model: Material,
          attributes: ['id', 'name', 'quantity'],
          through: {
            model: FoodMaterials,
            attributes: ['quantity'],
          },
        },
      ],
    });
    res.json({ success:true, foods });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Get a single food by ID
exports.getFoodById = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByPk(id, {
      include: [
        {
          model: Material,
          attributes: ['id', 'name', 'quantity'],
          through: { attributes: ['quantity'] },
        },
      ],
    });

    if (!food) {
      return next(new ErrorHandler('Food not found!', 404));
    }

    res.json({ food });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
// Add a new food
exports.addFood = catchAsyncErrors( async (req, res) => {
  try {
    const { name, price, materials } = req.body;

    const food = await Food.create({ name, price });

    // Add materials to the food
    await food.setMaterials(materials.map(material => ({ materialId: material.id, quantity: material.quantity })));

    res.status(201).json({ success:true, message: 'Food added successfully', food });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
// Update a food by ID
exports.updateFood = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, materials } = req.body;

    const food = await Food.findByPk(id);

    if (!food) {
      return next(new ErrorHandler('Food not found!', 404));
    }

    // Update food details
    await food.update({ name, price });

    // Update materials for the food
    await food.setMaterials(materials.map(material => ({ materialId: material.id, quantity: material.quantity })));

    res.json({ success:true, message: 'Food updated successfully', food });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Delete a food by ID
exports.deleteFood =  catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findByPk(id);

    if (!food) {
      return next(new ErrorHandler('Food not found!', 404));
    }

    await food.destroy();

    res.json({ success:true, message: 'Food deleted successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
