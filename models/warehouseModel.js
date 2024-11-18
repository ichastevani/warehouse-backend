// models/warehouseModel.js
const db = require('../config/db');

const Warehouse = {
    getAllWarehouses: (callback) => {
        const query = 'SELECT * FROM warehouses';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    getWarehouseById: (id, callback) => {
        const query = 'SELECT * FROM warehouses WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    addWarehouse: (warehouseData, callback) => {
        const query = 'INSERT INTO warehouses (name, address, detail) VALUES (?, ?, ?)';
        db.query(query, [warehouseData.name, warehouseData.address, warehouseData.detail], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    updateWarehouse: (id, warehouseData, callback) => {
        const query = 'UPDATE warehouses SET name = ?, address = ?, detail = ? WHERE id = ?';
        db.query(query, [warehouseData.name, warehouseData.address, warehouseData.detail, id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    deleteWarehouse: (id, callback) => {
        const query = 'DELETE FROM warehouses WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },
};

module.exports = Warehouse;
