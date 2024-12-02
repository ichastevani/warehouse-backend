const db = require('../config/db');

const saveStockHistory = (productId, addStock, outStock, callback) => {
  const sql = `
    INSERT INTO stock_history (product_id, add_stock, out_stock) 
    VALUES (?, ?, ?)
  `;
  db.query(sql, [productId, addStock, outStock], callback);
};

module.exports = {
  saveStockHistory
};
