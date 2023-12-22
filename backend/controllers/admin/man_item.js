// controllers/ItemController.js
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Item, Ingredient, item_ingredient} = require('../../models/relationship');
const ErrorHandler = require('../../util/ErrorHandler')
// Get all Items
exports.getAllItems = catchAsyncErrors(async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Ingredient,
          as:  "ingredient",
          attributes: ['id', 'name', 'quantity'],
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

// Get a single food by ID
exports.getItemById = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id, {
      include: [
        {
          model: Ingredient,
          as: "ingredient",
          attributes: ['id', 'name', ],//'quantity'
          through: { attributes: ['quantity'] },
        },
      ],
    });

    if (!item) {
      return next(new ErrorHandler('Item not found!', 404));
    }

    res.json({ success:true,item: item });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
// Add a new Item
exports.addItem = catchAsyncErrors( async (req, res) => {
  try {
    const { name, price, ingredients } = req.body;

    const item = await Item.create({ name: name, price:price , rating: 5});//trigger 

    ingredients.map(ingredient =>{
      console.log("id: ",ingredient.id)
      console.log("quantity: ",ingredient.quantity)
    })

    const ingredientAssociations = ingredients.map(ingredient => ({
      ingredient_id: ingredient.id,
      quantity: ingredient.quantity
    }));
    console.log("ingredientAssociations: ",ingredientAssociations)
    const record = await Ingredient.findAll({
      where: {
        id:1
      }
    })
   // console.log(record[0].dataValues)
    //console.log(ingredientAssociations[0].ingredient_id)
    await Promise.all(ingredients.map(async (ingredient) => {
      await item.setIngredient(
        [ingredient.id],
        {
          through: {
            quantity: ingredient.quantity
          }
        }
      );
    }));
    // await item.setIngredients()
    // await item.setIngredient([
    // ingredientAssociations[0].ingredient_id, 
    //    // quantity: ingredientAssociations.quantity 
      
    // ],
    //      {
    //         through: {
    //           quantity: ingredientAssociations[0].quantity 
    //         }
    //     }
    // );
    //console.log("ingredientAssociations: ",ingredientAssociations[0].ingredient_id," - ",ingredientAssociations[0].quantity)
   //await item.addIngredient(record[0].dataValues)
     //await item.setIngredient([])
    // await item.setIngredient([
    //   { ingredient_id:ingredientAssociations[0].ingredient_id, quantity: ingredientAssociations[0].quantity}
    // ]);
    // Add materials to the item
    //await item.setIngredient(ingredients.map(ingredient => ({ ingredient_id: ingredient.id, quantity: ingredient.quantity })));
    

    res.status(201).json({ success:true, message: 'Ingredient added successfully', item:item });
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
    await item.update({ name: name, price:price });

    
    // Update ingredients for the food
    //await item.setIngredients(ingredients.map(ingredient => ({ ingredient_id: ingredient.id, quantity: ingredient.quantity })));
    await Promise.all(ingredients.map(async (ingredient) => {
      await item.setIngredient(
        [ingredient.id],
        {
          through: {
            quantity: ingredient.quantity
          }
        }
      );
    }));

    res.json({ success:true, message: 'Item updated successfully', item: item });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Delete a item by ID
exports.deleteItem =  catchAsyncErrors(async (req, res, next) => {
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
