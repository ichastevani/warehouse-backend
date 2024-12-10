const express = require("express");
const router = express.Router();
const { resetStock, resetSystem } = require("../controllers/resetDataController");

// Route to reset stock data
router.delete("/resetStock", resetStock);

// Route to reset the entire system
router.delete("/resetSystem", resetSystem);

module.exports = router;
