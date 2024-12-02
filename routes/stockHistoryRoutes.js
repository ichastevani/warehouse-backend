const express = require('express');
const router = express.Router();
const stockHistoryController = require('../controllers/stockHistoryController');

router.post('/stock-history', stockHistoryController.recordStockHistory);

router.get('/', stockHistoryController.getAllStockHistory);

module.exports = router;
