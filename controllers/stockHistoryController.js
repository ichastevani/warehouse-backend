const stockHistoryModel = require('../models/stockHistoryModel');

const recordStockHistory = (req, res) => {
  const { productId, addStock, outStock } = req.body;

  console.log('Received data:', req.body);  // Menambahkan log untuk memeriksa data yang diterima

  if (typeof addStock !== 'number' || typeof outStock !== 'number' || typeof productId !== 'number') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  stockHistoryModel.saveStockHistory(productId, addStock, outStock, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving stock history', details: err });
    }

    res.status(200).json({ message: 'Stock history saved successfully', result });
  });
};

const getAllStockHistory = (req, res) => {
  stockHistoryModel.getAllStockHistory((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving stock history', details: err });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'No stock history found' });
    }

    res.status(200).json({ message: 'Stock history retrieved successfully', data: results });
  });
};

module.exports = {
  recordStockHistory,
  getAllStockHistory,
};
