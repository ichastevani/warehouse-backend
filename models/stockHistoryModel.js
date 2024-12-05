const db = require('../config/db');

const saveStockHistory = (productId, addStock, outStock, callback) => {
  const getStockQuery = 'SELECT stock FROM products WHERE id = ?';

  db.query(getStockQuery, [productId], (err, result) => {
    if (err) {
      return callback(err); 
    }
    
    if (result.length === 0) {
      return callback(new Error('Product not found'));
    }
    
    const currentStock = result[0].stock; 
    
    const updatedStock = currentStock ;
    
    const insertQuery = `
      INSERT INTO stock_history (product_id, add_stock, out_stock, updated_stock) 
      VALUES (?, ?, ?, ?)
    `;
    
    db.query(insertQuery, [productId, addStock, outStock, updatedStock], callback);
  });
};


const getAllStockHistory = (callback) => {
  const sql = 'SELECT * FROM stock_history ORDER BY created_at DESC';
  db.query(sql, callback);
};

const getStockData = (callback) => {
  const sql = `
    SELECT 
        stock_history.id AS "nomor",
        products.sku AS "kodeSKU",
        products.name AS "namaProduk",
        stock_history.add_stock AS "in",
        stock_history.out_stock AS "out",
        stock_history.updated_stock AS "stock",
      DATE_FORMAT(stock_history.created_at, '%Y-%m-%d') AS "createdAt"
    FROM stock_history
    JOIN products ON stock_history.product_id = products.id
    ORDER BY stock_history.created_at DESC
  `;
  
  db.query(sql, callback);
};

module.exports = {
  saveStockHistory,
  getAllStockHistory,
  getStockData,
};
