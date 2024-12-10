const db = require("../config/db");

// Reset all stock data by deleting stock and transaction records
const resetStockData = async () => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM products;
      DELETE FROM stock_history;
    `;
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Reset the entire system (you may need to modify this depending on your schema)
const resetEntireSystem = async () => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM products;
      DELETE FROM stock_history;
      DELETE FROM warehouses;
      DELETE FROM pusatdata;
    `;
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { resetStockData, resetEntireSystem };
