// controllers/productController.js
const productModel = require("../models/productModel");

const getProducts = (req, res) => {
  productModel.getAllProducts((err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
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
  const updatedProduct = req.body;
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

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
