// controllers/warehouseController.js
const Warehouse = require('../models/warehouseModel');

const WarehouseController = {
    getAllWarehouses: (req, res) => {
        Warehouse.getAllWarehouses((err, warehouses) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving warehouses', error: err });
            }
            res.status(200).json(warehouses);
        });
    },

    getWarehouseById: (req, res) => {
        const id = req.params.id;
        Warehouse.getWarehouseById(id, (err, warehouse) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving warehouse', error: err });
            }
            if (warehouse.length === 0) {
                return res.status(404).json({ message: 'Warehouse not found' });
            }
            res.status(200).json(warehouse);
        });
    },

    addWarehouse: (req, res) => {
        const { name, address, detail } = req.body;
        const newWarehouse = { name, address, detail };
        Warehouse.addWarehouse(newWarehouse, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error adding warehouse', error: err });
            }
            res.status(201).json({ message: 'Warehouse added successfully', id: result.insertId });
        });
    },

    updateWarehouse: (req, res) => {
        const id = req.params.id;
        const { name, address, detail } = req.body;
        const updatedWarehouse = { name, address, detail };
        Warehouse.updateWarehouse(id, updatedWarehouse, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating warehouse', error: err });
            }
            res.status(200).json({ message: 'Warehouse updated successfully' });
        });
    },

    deleteWarehouse: (req, res) => {
        const id = req.params.id;
        Warehouse.deleteWarehouse(id, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting warehouse', error: err });
            }
            res.status(200).json({ message: 'Warehouse deleted successfully' });
        });
    },
};

module.exports = WarehouseController;
