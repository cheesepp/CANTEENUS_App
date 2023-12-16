const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const { avtUpload, ingredientUpload, itemUpload } = require('../util/multer');

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

// /admin/get-staff => GET
router.get('/information', isAuthenticatedUser, userController.getUser);
router.post('/edit',isAuthenticatedUser,userController.editUser);
router.post('/change-password',isAuthenticatedUser, userController.userChangePassword)



module.exports = router;
