const path = require('path');
const express = require('express');

const authenticateController = require('../controllers/authenticate');

const router = express.Router();

router.post('/register', authenticateController.register)

router.post('/login', authenticateController.login)


module.exports = router;
