const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const jwtUtils = require('./jwtUtils');
const multer = require('multer');

// Set up multer storage for image uploads
const storage = multer.memoryStorage()

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.get('/', productController.getProducts);
router.get('/image/:id', productController.getProductImageByID);
router.post('/', jwtUtils.verifyToken, jwtUtils.verifyRole("admin"),  upload.single('image'), productController.createProduct);
router.put('/:id',jwtUtils.verifyToken, jwtUtils.verifyRole("admin"), upload.single('image'), productController.updateProduct);
router.delete('/:id',jwtUtils.verifyToken, jwtUtils.verifyRole("admin"), productController.deleteProduct);
// Route untuk memperbarui jumlah stok produk
router.put('/update-stock/:id', productController.updateStock);
// Route untuk mendapatkan total stok
router.get('/total-stock', productController.getTotalStock);
// popular produk pada dashboard
router.get('/popular-products', productController.getPopularProducts);

module.exports = router;
