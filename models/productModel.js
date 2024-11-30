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
            w.name AS warehouse_name,
            p.shelf_location
        FROM products p
        LEFT JOIN warehouses w ON p.location = w.id
    `;
    db.query(sql, callback);
};


const addProduct = (product, callback) => {
    console.log(product)
    const sql = `
        INSERT INTO products (sku, name, stock, unit, status, location, image, shelf_location) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [product.sku, product.name, product.stock, product.unit, product.status, product.location, product.image, product.shelf_location], callback);
};


const getTotalStock = (callback) => {
    const sql = `SELECT SUM(stock) AS totalStock FROM products`;
    db.query(sql, (err, result) => {
        if (err) return callback(err, null);
        callback(null, result[0]);
    });
};




const updateProduct = (id, product, callback) => {
    const sql = 'UPDATE products SET sku = ?, name = ?, stock = ?, unit = ?, status = ?, location = ?, shelf_location = ? WHERE id = ?';
    db.query(sql, [product.sku, product.name, product.stock, product.unit, product.status, product.location, product.shelf_location, id], callback);
};


const deleteProduct = (id, callback) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], callback);
};

const updateProductStock = (id, stock, callback) => {
    const sql = `
        UPDATE products
        SET stock = ?
        WHERE id = ?
    `;
    db.query(sql, [stock, id], callback);
};

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getTotalStock, 
    updateProductStock,
};
