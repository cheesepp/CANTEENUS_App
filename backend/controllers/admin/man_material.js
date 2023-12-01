// controllers/materialController.js
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Material } = require('../../models/relationship');

// Get all materials
exports.getAllMaterials = catchAsyncErrors(async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.status(200).json({ success:true,  materials });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Get a single material by ID
exports.getMaterialByID = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);

    if (!material) {
      return next(new ErrorHandler('Material not found!', 404));
    }

    res.json({ success:true, material });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Add a new material
exports.addMaterial = catchAsyncErrors(async (req, res) => {
  try {
    const { category, name, unit, quantity, price, expirationDate } = req.body;

    const material = await Material.create({
      category,
      name,
      unit,
      quantity,
      price,
      expirationDate,
    });

    res.status(201).json({ success: true, message: 'Material added successfully', material });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Update a material by ID
exports.updateMaterial = catchAsyncErrors( async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, unit, quantity, price, expirationDate } = req.body;

    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    await material.update({
      category,
      name,
      unit,
      quantity,
      price,
      expirationDate,
    });

    res.json({ success:true, message: 'Material updated successfully', material });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Delete a material by ID
exports.deleteMaterial = catchAsyncErrors( async (req, res) => {
  try {
    const { id } = req.params;

    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    await material.destroy();

    res.json({ success:true, message: 'Material deleted successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})
