const path = require('path');

const express = require('express');

const adminControllerStaff = require('../controllers/admin/man_staff');
const adminControllerMaterial = require('../controllers/admin/man_material');
const { avtUpload } = require('../util/multer');

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
router.post('/add-material', isAuthenticatedUser, adminControllerMaterial.addMaterial);

// Update a material by ID
router.put('/update-material/:id', isAuthenticatedUser, adminControllerMaterial.updateMaterial);

// Delete a material by ID
router.delete('/delete-material/:id', isAuthenticatedUser, adminControllerMaterial.deleteMaterial);

module.exports = router;
