const express = require('express');
const router = express.Router();
const cartTransactionController= require('../controllers/cartTransactionController');

router.post('/checkout', cartTransactionController.createTransaction);

router.get('/transaction', cartTransactionController.getAllTransactions);

router.get('/transaction/:id', cartTransactionController.getTransactionById);


module.exports = router;
