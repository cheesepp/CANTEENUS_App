const path = require('path');
const express = require('express');
const { avtUpload } = require('../util/multer');

const authenticateController = require('../controllers/authenticate');

const router = express.Router();

router.post('/register', avtUpload.single('image'), authenticateController.register)

router.post('/login', authenticateController.login)
// Trả token authenticate
router.get('/token', authenticateController.isAuth);



module.exports = router;
