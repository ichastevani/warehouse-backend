// routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const WarehouseController = require('../controllers/warehouseController');
const jwtUtils = require('./jwtUtils');

router.get('/', WarehouseController.getAllWarehouses);
router.get('/', WarehouseController.getWarehouseById);
router.post('/',jwtUtils.verifyToken, jwtUtils.verifyRole("admin"), WarehouseController.addWarehouse);
router.put('/:id',jwtUtils.verifyToken, jwtUtils.verifyRole("admin"), WarehouseController.updateWarehouse);
router.delete('/:id',jwtUtils.verifyToken, jwtUtils.verifyRole("admin"), WarehouseController.deleteWarehouse);

module.exports = router;
