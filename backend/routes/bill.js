const path = require('path');

const express = require('express');

const billController = require('../controllers/bill');

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

// /bill/get-bill => GET
router.get('/get-bill', isAuthenticatedUser, billController.getAllBills);

// /bill/get-bill/:id => GET
router.get('/get-bill/:id', isAuthenticatedUser, billController.getBillById);

// /bill/add-bill => POST
router.post('/add-bill', isAuthenticatedUser, billController.addBill);

// /bill/edit-bill => PUT
router.put('/edit-bill/:id', isAuthenticatedUser, billController.updateBill);

// /bill/delete-bill => DELETE
router.delete('/delete-bill/:id', isAuthenticatedUser, billController.deleteBill);

module.exports = router;
