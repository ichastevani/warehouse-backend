const express = require('express');
const router = express.Router();
const stockHistoryController = require('../controllers/stockHistoryController');

router.post('/stock-history', stockHistoryController.recordStockHistory);

router.get('/', stockHistoryController.getAllStockHistory);

router.get('/report', stockHistoryController.report);

module.exports = router;
