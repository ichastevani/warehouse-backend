// models/productModel.js
const db = require('../config/db'); // Pastikan untuk mengimpor koneksi yang benar

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
            p.location,
            p.shelf_location
        FROM products p
        LEFT JOIN warehouses w ON p.location = w.id
    `;
    db.query(sql, callback);
};

const getProductImageByID = (productID, callback) => {
    const sql = `
        SELECT 
            p.image
        FROM products p
        LEFT JOIN warehouses w ON p.location = w.id
        WHERE p.id = ?
    `;
    db.query(sql, [productID], callback);
};

const addProduct = (product, callback) => {
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
    const sql = 'UPDATE products SET sku = ?, name = ?, stock = ?, unit = ?, status = ?, location = ?, shelf_location = ?, image = ? WHERE id = ?';
    db.query(sql, [product.sku, product.name, product.stock, product.unit, product.status, product.location, product.shelf_location, product.image, id], callback);
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

// Fungsi untuk mendapatkan produk populer berdasarkan aktivitas di stock_history
const getPopularProducts = (callback) => {
    const sql = `
      SELECT 
        sh.product_id, 
        p.name, 
        COUNT(*) AS total_activity
        FROM stock_history sh
        JOIN products p ON sh.product_id = p.id
        WHERE sh.add_stock > 0 OR sh.out_stock > 0
        GROUP BY sh.product_id
        ORDER BY total_activity DESC
        LIMIT 5
    `;
    
    db.query(sql, callback);
};


module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getTotalStock, 
    updateProductStock,
    getProductImageByID,
    getPopularProducts
};
