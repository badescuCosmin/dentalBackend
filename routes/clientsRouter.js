const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router
    .route('/')
    .get(clientsController.getAllClients)
    .post(clientsController.createClient);
router
    .route('/total')
    .get(clientsController.getNumberAndTotal)
router
    .route('/searchByName/:id')
    .get(clientsController.getClientsByName)

router
    .route('/sortare/:id')
    .get(clientsController.getSortare)

router
    .route('/:id')
    .get(clientsController.getASpecificUser)
    .put(clientsController.updateClient)
    .delete(clientsController.deleteClient);

module.exports = router;