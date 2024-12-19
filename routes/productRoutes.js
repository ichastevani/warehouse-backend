const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const jwtUtils = require('./jwtUtils');
const multer = require('multer');


const storage = multer.memoryStorage()


const upload = multer({ storage: storage });

router.get('/', productController.getProducts);
router.get('/image/:id', productController.getProductImageByID);
router.post('/', jwtUtils.verifyToken, jwtUtils.verifyRole("admin"),  upload.single('image'), productController.createProduct);
router.put('/:id',jwtUtils.verifyToken, jwtUtils.verifyRole("admin"), upload.single('image'), productController.updateProduct);
router.delete('/:id',jwtUtils.verifyToken, jwtUtils.verifyRole("admin"), productController.deleteProduct);

router.put('/update-stock/:id', productController.updateStock);

router.get('/total-stock', productController.getTotalStock);

router.get('/popular-products', productController.getPopularProducts);

module.exports = router;
