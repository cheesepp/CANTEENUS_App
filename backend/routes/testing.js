const path = require('path');

const express = require('express');

const adminControllerStaff = require('../controllers/admin/man_staff');
const adminControllerIngredient = require('../controllers/admin/man_ingredients');
const adminControllerItem = require('../controllers/admin/man_item')
const adminControllerBusinessTarget = require('../controllers/admin/man_target')
const adminControllerFinance = require('../controllers/admin/man_finance')

const billController = require('../controllers/bill');
const { avtUpload, ingredientUpload, itemUpload } = require('../util/multer');

const router = express.Router();

// /admin/get-staff => GET
router.get('/get-staff',    adminControllerStaff.getStaff);

// /admin/get-staff => GET
router.get('/get-staff/:id',  adminControllerStaff.getStaffByID)

// /admin/add-staff => POST
router.post('/add-staff',    avtUpload.single('image'), adminControllerStaff.addStaff);

// /admin/edit-staff => POST
router.put('/edit-staff/:id',    adminControllerStaff.editStaff);

// /admin/delete-staff => POST
router.delete('/delete-staff/:id',    adminControllerStaff.deleteStaff);


// Get all ingredients
router.get('/get-ingredient',    adminControllerIngredient.getAllIngredients);

// Get a single ingredient by ID
router.get('/get-ingredient/:id',    adminControllerIngredient.getIngredientByID);

// Add a new ingredient
router.post('/add-ingredient',    ingredientUpload.single('image'), adminControllerIngredient.addIngredient);

// Update a ingredient by ID
router.put('/edit-ingredient/:id',    adminControllerIngredient.updateIngredient);

// Delete a ingredient by ID
router.delete('/delete-ingredient/:id',    adminControllerIngredient.deleteIngredient);


// Get all item
router.get('/get-item',    adminControllerItem.getAllItems);

// Get a single food by ID
router.get('/get-item/:id',    adminControllerItem.getItemById);

// Add a new food
router.post('/add-item',    itemUpload.single('image'), adminControllerItem.addItem);

// Update a food by ID
router.put('/update-item/:id',    adminControllerItem.updateItem);

// Delete a food by ID
router.delete('/delete-item/:id',    adminControllerItem.deleteItem);


// Get all business target
router.get('/get-target',    adminControllerBusinessTarget.getAllTarget);

// Get a single business target by ID
router.get('/get-target/:id',    adminControllerBusinessTarget.getTargetById);

// Add a new business target
router.post('/add-target',    adminControllerBusinessTarget.addTarget);

// Update a business target by ID
router.put('/edit-target/:id',    adminControllerBusinessTarget.updateTarget);

// Delete a business target by ID
router.delete('/delete-target/:id',    adminControllerBusinessTarget.deleteTarget);



// /bill/get-bill => GET
router.get('/get-bill',    billController.getAllBills);

// /bill/get-bill/:id => GET
router.get('/get-bill/:id',    billController.getBillById);

// /bill/add-bill => POST
router.post('/add-bill',    billController.addBill);

// /bill/edit-bill => PUT
router.put('/edit-bill/:id',    billController.updateBill);

// /bill/delete-bill => DELETE
router.delete('/delete-bill/:id',    billController.deleteBill);


// /bill/get-bill => GET
router.get('/get-bill',   billController.getAllBills);

// /bill/get-bill/:id => GET
router.get('/get-bill/:id',   billController.getBillById);

// /bill/add-bill => POST
router.post('/add-bill',   billController.addBill);

// /bill/edit-bill => PUT
router.put('/edit-bill/:id',   billController.updateBill);

// /bill/delete-bill => DELETE
router.delete('/delete-bill/:id',   billController.deleteBill);

router.post('/get-profit-by-month', adminControllerFinance.getProfitByMonth);

router.post('/get-profit-by-year', adminControllerFinance.getProfitByYear);

router.post('/get-profit-of-a-year', adminControllerFinance.getProfitOfAYear);

module.exports = router;
