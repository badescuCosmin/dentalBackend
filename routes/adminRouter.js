const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.route('/').post(adminController.signup)

router.route('/:username/:password').get(adminController.login)


module.exports = router;