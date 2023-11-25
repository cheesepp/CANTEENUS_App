const path = require('path');

const express = require('express');

const adminControllerStaff = require('../controllers/admin/man_staff');
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


module.exports = router;
