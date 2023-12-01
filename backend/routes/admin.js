const path = require('path');

const express = require('express');

const adminControllerStaff = require('../controllers/admin/man_staff');
const adminControllerMaterial = require('../controllers/admin/man_material');
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


// Get all materials
router.get('/get-material', isAuthenticatedUser, adminControllerMaterial.getAllMaterials);

// Get a single material by ID
router.get('/get-material/:id', isAuthenticatedUser, adminControllerMaterial.getMaterialByID);

// Add a new material
router.post('/add-material', isAuthenticatedUser, materialUpload.single('image'), adminControllerMaterial.addMaterial);

// Update a material by ID
router.put('/edit-material/:id', isAuthenticatedUser, adminControllerMaterial.updateMaterial);

// Delete a material by ID
router.delete('/delete-material/:id', isAuthenticatedUser, adminControllerMaterial.deleteMaterial);

// Get all foods
router.get('/get-food', isAuthenticatedUser, adminControllerFood.getAllFoods);

// Get a single food by ID
router.get('/:id', isAuthenticatedUser, adminControllerFood.getFoodById);

// Add a new food
router.post('/add', isAuthenticatedUser, foodUpload.single('image'), adminControllerFood.addFood);

// Update a food by ID
router.put('/update/:id', isAuthenticatedUser, adminControllerFood.updateFood);

// Delete a food by ID
router.delete('/delete/:id', isAuthenticatedUser, adminControllerFood.deleteFood);

module.exports = router;
