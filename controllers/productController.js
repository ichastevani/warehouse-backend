// controllers/productController.js
const productModel = require("../models/productModel");

const getProducts = (req, res) => {
  productModel.getAllProducts((err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
  });
};

const getTotalStock = (req, res) => {
  productModel.getTotalStock((err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ totalStock: result.totalStock || 0 });
  });
};

const getProductImageByID = (req, res) => {
  const productID = req.params.id;
  productModel.getProductImageByID(productID, (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (results.length > 0) {
        const imageBuffer = results[0].image; // image_data is a BLOB column
        res.setHeader('Content-Type', 'image/jpeg'); // or 'image/png' depending on your image type
        res.send(imageBuffer);
      } else {
        res.status(404).send('Image not found');
      }
  });
};

const createProduct = (req, res) => {
  var image
  if (req.file) {
    image = req.file.buffer; // The uploaded image 
  }
  
  const { sku, name, stock, unit, status, location, shelf_location } = req.body;
  const newProduct = { sku, name, stock, unit, status, location, image, shelf_location };
  productModel.addProduct(newProduct, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Produk berhasil ditambahkan", id: result.insertId });
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  if (req.file) {
    image = req.file.buffer; // The uploaded image
  }
  const { sku, name, stock, unit, status, location, shelf_location } = req.body;
  const updatedProduct = { sku, name, stock, unit, status, location, image, shelf_location };
  productModel.updateProduct(id, updatedProduct, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Produk berhasil diperbarui" });
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Produk berhasil dihapus" });
  });
};

const updateStock = (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  // Pastikan parameter stok yang diterima adalah angka dan lebih besar dari 0
  if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ message: "Stok harus berupa angka dan lebih besar dari 0" });
  }

  // Panggil fungsi di model untuk memperbarui stok produk
  productModel.updateProductStock(id, stock, (err, result) => {
      if (err) {
          return res.status(500).json({ message: "Terjadi kesalahan saat memperbarui stok", error: err });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      res.status(200).json({ message: "Stok produk berhasil diperbarui", data: result });
  });
};

const getPopularProducts = (req, res) => {
  // Panggil fungsi getPopularProducts pada productModel untuk mendapatkan data populer
  productModel.getPopularProducts((err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching popular products', error: err });
    }
    res.json(products);
  });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getTotalStock, 
  updateStock,
  getProductImageByID,
  getPopularProducts
};
