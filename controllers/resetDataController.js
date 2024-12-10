const { resetStockData, resetEntireSystem } = require("../models/resetDataModel");

// Controller for resetting stock data
const resetStock = async (req, res) => {
  try {
    await resetStockData();
    return res.status(200).json({ message: "Stock data has been reset successfully." });
  } catch (error) {
    console.error("Error resetting stock data:", error);
    return res.status(500).json({ error: "Failed to reset stock data." });
  }
};

// Controller for resetting the entire system
const resetSystem = async (req, res) => {
  try {
    await resetEntireSystem();
    return res.status(200).json({ message: "System has been reset successfully." });
  } catch (error) {
    console.error("Error resetting system:", error);
    return res.status(500).json({ error: "Failed to reset system." });
  }
};

module.exports = { resetStock, resetSystem };
