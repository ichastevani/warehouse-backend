const express = require('express');
const router = express.Router();
const stockHistoryController = require('../controllers/stockHistoryController');

router.post('/stock-history', stockHistoryController.recordStockHistory);

module.exports = router;
