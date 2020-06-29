const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router
    .route('/')
    .post(requestController.postMesaj)
    .get(requestController.getMessages)

router
    .route('/:id')
    .delete(requestController.deleteMessage);
    
module.exports = router;