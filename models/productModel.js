// models/productModel.js
const db = require('../config/db');

const getAllProducts = (callback) => {
    const sql = `
        SELECT 
            p.id,
            p.sku,
            p.name,
            p.stock,
            p.unit,
            p.status,
            p.shelf_location,
            w.name AS warehouse_name,
            p.image_path
        FROM products p
        LEFT JOIN warehouses w ON p.warehouse_id = w.id
    `;
    db.query(sql, callback);
};


const addProduct = (product, callback) => {
    const sql = `
        INSERT INTO products (sku, name, stock, status, location) 
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [product.sku, product.name, product.stock, product.status, product.location], callback);
};




const updateProduct = (id, product, callback) => {
    const sql = 'UPDATE products SET sku = ?, name = ?, stock = ?, status = ?, warehouse_id = ? WHERE id = ?';
    db.query(sql, [product.sku, product.name, product.stock, product.status, product.warehouse_id, id], callback);
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
