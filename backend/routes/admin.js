const path = require('path');

const express = require('express');

const adminControllerStaff = require('../controllers/admin/man_staff');
const adminControllerMaterial = require('../controllers/admin/man_ingredients');
const adminControllerFood = require('../controllers/admin/man_food')

const { avtUpload, materialUpload, foodUpload } = require('../util/multer');

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

// /admin/get-staff => GET
router.get('/get-staff', isAuthenticatedUser, adminControllerStaff.getStaff);

// /admin/add-staff => POST
router.post('/add-staff', isAuthenticatedUser, avtUpload.single('image'), adminControllerStaff.addStaff);

// /admin/edit-staff => POST
router.put('/edit-staff/:id', isAuthenticatedUser, adminControllerStaff.editStaff);

// /admin/delete-staff => POST
router.delete('/delete-staff/:id', isAuthenticatedUser, adminControllerStaff.deleteStaff);


// Get all ingredients
router.get('/get-ingredient', isAuthenticatedUser, adminControllerMaterial.getAllMaterials);

// Get a single ingredient by ID
router.get('/get-ingredient/:id', isAuthenticatedUser, adminControllerMaterial.getMaterialByID);

// Add a new ingredient
router.post('/add-ingredient', isAuthenticatedUser, materialUpload.single('image'), adminControllerMaterial.addMaterial);

// Update a ingredient by ID
router.put('/edit-ingredient/:id', isAuthenticatedUser, adminControllerMaterial.updateMaterial);

// Delete a ingredient by ID
router.delete('/delete-ingredient/:id', isAuthenticatedUser, adminControllerMaterial.deleteMaterial);

// Get all item
router.get('/get-item', isAuthenticatedUser, adminControllerFood.getAllFoods);

// Get a single food by ID
router.get('/get-item/:id', isAuthenticatedUser, adminControllerFood.getFoodById);

// Add a new food
router.post('/add-item', isAuthenticatedUser, foodUpload.single('image'), adminControllerFood.addFood);

// Update a food by ID
router.put('/update-item/:id', isAuthenticatedUser, adminControllerFood.updateFood);

// Delete a food by ID
router.delete('/delete-item/:id', isAuthenticatedUser, adminControllerFood.deleteFood);

module.exports = router;
