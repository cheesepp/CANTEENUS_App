const path = require('path');

const express = require('express');

const adminControllerStaff = require('../controllers/admin/man_staff');
const adminControllerIngredient = require('../controllers/admin/man_ingredients');
const adminControllerItem = require('../controllers/admin/man_item')
const adminControllerBusinessTarget = require('../controllers/admin/man_target')

const adminControllerFinance = require('../controllers/admin/man_finance')

const { avtUpload, ingredientUpload, itemUpload } = require('../util/multer');

const router = express.Router();
const  { isAuthenticatedUser } = require("../middleware/auth");

// /admin/get-staff => GET
router.get('/get-staff', isAuthenticatedUser, adminControllerStaff.getStaff);

// /admin/get-staff => GET
router.get('/get-staff/:id',isAuthenticatedUser,adminControllerStaff.getStaffByID)

// /admin/add-staff => POST
router.post('/add-staff', isAuthenticatedUser, avtUpload.single('image'), adminControllerStaff.addStaff);

// /admin/edit-staff => POST
router.put('/edit-staff/:id', isAuthenticatedUser, adminControllerStaff.editStaff);

// /admin/delete-staff => POST
router.delete('/delete-staff/:id', isAuthenticatedUser, adminControllerStaff.deleteStaff);


// Get all ingredients
router.get('/get-ingredient', isAuthenticatedUser, adminControllerIngredient.getAllIngredients);

// Get a single ingredient by ID
router.get('/get-ingredient/:id', isAuthenticatedUser, adminControllerIngredient.getIngredientByID);

// Add a new ingredient
router.post('/add-ingredient', isAuthenticatedUser, ingredientUpload.single('image'), adminControllerIngredient.addIngredient);

// Update a ingredient by ID
router.put('/edit-ingredient/:id', isAuthenticatedUser, adminControllerIngredient.updateIngredient);

// Delete a ingredient by ID
router.delete('/delete-ingredient/:id', isAuthenticatedUser, adminControllerIngredient.deleteIngredient);


// Get all item
router.get('/get-item', isAuthenticatedUser, adminControllerItem.getAllItems);

// Get a single food by ID
router.get('/get-item/:id', isAuthenticatedUser, adminControllerItem.getItemById);

// Add a new food
router.post('/add-item', isAuthenticatedUser, itemUpload.single('image'), adminControllerItem.addItem);

// Update a food by ID
router.put('/update-item/:id', isAuthenticatedUser, adminControllerItem.updateItem);

// Delete a food by ID
router.delete('/delete-item/:id', isAuthenticatedUser, adminControllerItem.deleteItem);


// Get all business target
router.get('/get-target', isAuthenticatedUser, adminControllerBusinessTarget.getAllTarget);

// Get a single business target by ID
router.get('/get-target/:id', isAuthenticatedUser, adminControllerBusinessTarget.getTargetById);

// Add a new business target
router.post('/add-target', isAuthenticatedUser, adminControllerBusinessTarget.addTarget);

// Update a business target by ID
router.put('/edit-target/:id', isAuthenticatedUser, adminControllerBusinessTarget.updateTarget);

// Delete a business target by ID
router.delete('/delete-target/:id', isAuthenticatedUser, adminControllerBusinessTarget.deleteTarget);


router.post('/get-profit-by-month', isAuthenticatedUser, adminControllerFinance.getProfitByMonth);

router.post('/get-profit-by-year', isAuthenticatedUser, adminControllerFinance.getProfitByYear);

router.post('/get-profit-of-a-year', isAuthenticatedUser, adminControllerFinance.getProfitOfAYear);
router.post('/get-years', isAuthenticatedUser, adminControllerFinance.getNumberOfYear);
module.exports = router;
