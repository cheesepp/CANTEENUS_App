// controllers/materialController.js
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Ingredient } = require('../../models/relationship');

// Get all ingredients
exports.getAllIngredients = catchAsyncErrors(async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json({ success:true,  ingredients });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Get a single ingredient by ID
exports.getIngredientByID = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return next(new ErrorHandler('Material not found!', 404));
    }

    res.json({ success:true, ingredient });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Add a new material
exports.addIngredient = catchAsyncErrors(async (req, res) => {
  try {
    const { calories, name, unit, quantity, price, expirationDate } = req.body;

    const material = await Ingredient.create({
      calories,
      name,
      unit,
      quantity,
      price,
      expirationDate,
    });

    res.status(201).json({ success: true, message: 'Ingredient added successfully', ingredient });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Update a ingredient by ID
exports.updateIngredient = catchAsyncErrors( async (req, res) => {
  try {
    const { id } = req.params;
    const { calories, name, unit, quantity, price, expirationDate } = req.body;

    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    await ingredient.update({
      calories,
      name,
      unit,
      quantity,
      price,
      expirationDate,
    });

    res.json({ success:true, message: 'Ingredient updated successfully', ingredient });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Delete a ingredient by ID
exports.deleteIngredient = catchAsyncErrors( async (req, res) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    await ingredient.destroy();

    res.json({ success:true, message: 'Ingredient deleted successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
