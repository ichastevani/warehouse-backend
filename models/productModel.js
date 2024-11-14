// models/productModel.js
const db = require('../config/db');

const getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

const addProduct = (product, callback) => {
    const sql = 'INSERT INTO products (sku, name, stock, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [product.sku, product.name, product.stock, product.status], callback);
};

const updateProduct = (id, product, callback) => {
    const sql = 'UPDATE products SET sku = ?, name = ?, stock = ?, status = ? WHERE id = ?';
    db.query(sql, [product.sku, product.name, product.stock, product.status, id], callback);
};

const deleteProduct = (id, callback) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};
