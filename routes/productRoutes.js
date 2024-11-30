const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Set up multer storage for image uploads
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Route untuk mendapatkan semua produk
router.get('/', productController.getProducts);

// Route untuk menambahkan produk baru dengan gambar
router.post('/', upload.single('image'), productController.createProduct);

// Route untuk memperbarui produk dengan gambar
router.put('/:id', upload.single('image'), productController.updateProduct);

// Route untuk memperbarui jumlah stok produk
router.put('/update-stock/:id', productController.updateStock);

// Route untuk menghapus produk
router.delete('/:id', productController.deleteProduct);

// Route untuk mendapatkan total stok
router.get('/total-stock', productController.getTotalStock);

module.exports = router;
