// routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const WarehouseController = require('../controllers/warehouseController');

router.get('/', WarehouseController.getAllWarehouses);
router.get('/', WarehouseController.getWarehouseById);
router.post('/', WarehouseController.addWarehouse);
router.put('/:id', WarehouseController.updateWarehouse);
router.delete('/:id', WarehouseController.deleteWarehouse);

module.exports = router;
