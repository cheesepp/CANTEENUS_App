// controllers/ItemController.js
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Item, Ingredient, item_ingredient} = require('../../models/relationship');

// Get all Items
exports.getAllItems = catchAsyncErrors(async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Ingredient,
          attributes: ['id', 'name', 'quantity'],
          through: {
            model: item_ingredient,
            attributes: ['quantity'],
          },
        },
      ],
    });
    res.json({ success:true, items });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Get a single food by ID
exports.getItemById = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id, {
      include: [
        {
          model: Material,
          attributes: ['id', 'name', 'quantity'],
          through: { attributes: ['quantity'] },
        },
      ],
    });

    if (!item) {
      return next(new ErrorHandler('Item not found!', 404));
    }

    res.json({ item });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
// Add a new Item
exports.addItem = catchAsyncErrors( async (req, res) => {
  try {
    const { name, price, ingredients } = req.body;

    const item = await Item.create({ name, price });

    // Add materials to the item
    await item.setIngredients(ingredients.map(ingredient => ({ ingredientId: ingredient.id, quantity: ingredient.quantity })));

    res.status(201).json({ success:true, message: 'Ingredient added successfully', food });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
// Update a item by ID
exports.updateItem = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, ingredients } = req.body;

    const item = await Item.findByPk(id);

    if (!item) {
      return next(new ErrorHandler('Item not found!', 404));
    }

    // Update item details
    await item.update({ name, price });

    // Update ingredients for the food
    await item.setIngredients(ingredients.map(ingredient => ({ ingredientId: ingredient.id, quantity: ingredient.quantity })));

    res.json({ success:true, message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Delete a item by ID
exports.deleteItem =  catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByPk(id);

    if (!item) {
      return next(new ErrorHandler('Item not found!', 404));
    }

    await item.destroy();

    res.json({ success:true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
