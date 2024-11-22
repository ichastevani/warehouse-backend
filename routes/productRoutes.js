// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const multer = require('multer');

// Set up multer storage for image uploads
const storage = multer.memoryStorage()

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.get('/', productController.getProducts);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id',upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
