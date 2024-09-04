const path = require('path');

const express = require('express');

const adminController = require('../controllers/users');

const router = express.Router();

router.post('/user/signup', adminController.postAddUsers);

module.exports = router;