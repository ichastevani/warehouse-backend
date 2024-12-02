// routes/pusatdataRoutes.js
const express = require('express');
const router = express.Router();
const pusatdataController = require('../controllers/pusatdataController');

// Get all pusatdata records
router.get('/api/pusatdata', pusatdataController.getPaginatedPusatData);

// Create a new pusatdata record
router.post('/api/pusatdata', pusatdataController.createPusatData);

// Update a pusatdata record by ID
router.put('/api/pusatdata/:id', pusatdataController.updatePusatData);

// Delete a pusatdata record by ID
router.delete('/api/pusatdata/:id', pusatdataController.deletePusatData);

module.exports = router;
